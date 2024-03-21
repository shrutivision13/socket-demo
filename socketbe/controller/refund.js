const { updateCart } = require("./cart");
const { generateAccessToken } = require("./payment");
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_BASE_URL, STRIPE_SECRECT_APIKEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRECT_APIKEY);

const paypalRefund = async (payment_id, id, status) => {
    const raw = {}
    let token = await generateAccessToken()
    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(raw),
        redirect: "follow"
    };

    return await fetch(`${process.env.PAYPAL_BASE_URL}/v2/payments/captures/${payment_id}/refund`, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
            console.log("🚀 ~ .then ~ result:", result)
            if (result.status === "COMPLETED") {
                return handleResponse()
            }
            return ({ status: 400, message: result?.message })

        })
        .catch((error) => console.error(error));

}

const handleResponse = async (id, status) => {
    await updateCart(id, { status, transactionStatus: "Refund" })
    return ({ status: 200, message: "Refund completed" })
}

const stripeRefund = async (payment_id, id, status) => {
    try {

        const refund = await stripe.refunds.create({
            payment_intent: payment_id,
        });
        if (refund?.status === "succeeded") {
            return handleResponse(id, status)
        }
        console.log("🚀 ~ stripeRefund ~ refund:", refund)
    } catch (err) {
        return ({ status: 500, error: err?.raw?.message })


    }

}

function refundTransaction(transactionId, paymentDetails, callback) {
    console.log("🚀 ~ refundTransaction ~ paymentDetails?.cardNumber?.slice(-4):", paymentDetails?.cardNumber?.slice(-4))
    console.log("🚀 ~ refundTransaction ~ paymentDetails?.expiryDate?.replace():", paymentDetails?.expiryDate?.replace("/", ""))


    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZED_API_LOGINID);
    merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZED_TRANSACTION_KEY);

    var creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(paymentDetails?.cardNumber);
    creditCard.setExpirationDate(paymentDetails?.expiryDate?.replace("/", ""));
    // creditCard.setCardNumber(cardNumber);
    // creditCard.setExpirationDate(expirydate);

    var paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.REFUNDTRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(2);
    transactionRequestType.setRefTransId(transactionId?.transactionId);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

    ctrl.execute(function () {

        var apiResponse = ctrl.getResponse();

        var response = new ApiContracts.CreateTransactionResponse(apiResponse);

        //pretty print response
        console.log(JSON.stringify(response, null, 2));


        callback(response);
    });
}

// if (require.main === module) {
//     refundTransaction('2259764785', function () {
//         console.log('refundTransaction call complete.');
//     });
// }


module.exports = { paypalRefund, stripeRefund, refundTransaction }