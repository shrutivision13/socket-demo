const { updateCart } = require('./cart');
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_BASE_URL, STRIPE_SECRECT_APIKEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRECT_APIKEY);

const getAnAcceptPaymentPage = async (body, res) => {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZED_API_LOGINID);
    merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZED_TRANSACTION_KEY);

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setAmount(body?.amount);

    var setting1 = new ApiContracts.SettingType();
    setting1.setSettingName('hostedPaymentButtonOptions');
    setting1.setSettingValue('{\"text\": \"Pay\"}');

    var setting2 = new ApiContracts.SettingType();
    setting2.setSettingName('hostedPaymentOrderOptions');
    setting2.setSettingValue('{\"show\": true}');

    var setting3 = new ApiContracts.SettingType();
    setting3.setSettingName('hostedPaymentReturnOptions');
    // setting3.setSettingValue('{\"showReceipt\" : false,\"url\": \"https://mysite.com/receipt\", \"urlText\": \"Continue\", \"cancelUrl\": \"https://mysite.com/cancel\", \"cancelUrlText\": \"Cancel\"}'
    setting3.setSettingValue('{\"showReceipt\" : true,\"url\": \"http://example.com\", \"urlText\": \"Continue\", \"cancelUrl\": \"https://mysite.com/cancel\", \"cancelUrlText\": \"Cancel\"}'
    );

    var settingList = [];
    settingList.push(setting1);
    settingList.push(setting2);
    settingList.push(setting3);

    var alist = new ApiContracts.ArrayOfSetting();
    alist.setSetting(settingList);

    var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
    getRequest.setMerchantAuthentication(merchantAuthenticationType);
    getRequest.setTransactionRequest(transactionRequestType);
    getRequest.setHostedPaymentSettings(alist);
    // var host = new ApiContracts.HostedPaymentSettings({ "showReceipt": true, "url": "https://mysite.com/receipt", "urlText": "Continue", "cancelUrl": "https://mysite.com/cancel", "cancelUrlText": "Cancel" });
    // getRequest.setHostedPaymentReturnOptions({ "url": "https://mysite.com/receipt", "urlText": "Continue", "cancelUrl": "https://mysite.com/cancel", "cancelUrlText": "Cancel" });

    //console.log(JSON.stringify(getRequest.getJSON(), null, 2));

    var ctrl = new ApiControllers.GetHostedPaymentPageController(getRequest.getJSON());

    ctrl.execute(function () {

        var apiResponse = ctrl.getResponse();

        var response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

        //pretty print response
        //console.log(JSON.stringify(response, null, 2));

        if (response != null) {
            if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                console.log('Hosted payment page token :');
                console.log(response.getToken());
            }
            else {
                //console.log('Result Code: ' + response.getMessages().getResultCode());
                console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
            }
        }
        else {
            console.log('Null response received');
        }

        // callback(response);
    });
}

async function chargeCreditCard(body, callback) {
    console.log("🚀 ~ chargeCreditCard ~ body:", body)
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZED_API_LOGINID);
    merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZED_TRANSACTION_KEY);

    var creditCard = new ApiContracts.OpaqueDataType();
    creditCard.setDataDescriptor(body?.opaqueData?.dataDescriptor);
    creditCard.setDataValue(body?.opaqueData?.dataValue);
    // creditCard.setExpirationDate('0835');
    // creditCard.setCardCode('999');

    var paymentType = new ApiContracts.PaymentType();
    paymentType.setOpaqueData(creditCard);

    var orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber('INV-12345');
    orderDetails.setDescription('Product Description');

    var tax = new ApiContracts.ExtendedAmountType();
    tax.setAmount(body?.product?.amount);
    tax.setName('level2 tax name');
    tax.setDescription('level2 tax');

    var duty = new ApiContracts.ExtendedAmountType();
    duty.setAmount('8.55');
    duty.setName('duty name');
    duty.setDescription('duty description');

    var shipping = new ApiContracts.ExtendedAmountType();
    shipping.setAmount('8.55');
    shipping.setName('shipping name');
    shipping.setDescription('shipping description');

    var billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(body?.customerInformation?.firstName);
    billTo.setLastName(body?.customerInformation?.lastName);


    var shipTo = new ApiContracts.CustomerAddressType();
    // shipTo.setFirstName('China');
    // shipTo.setLastName('Bayles');
    // shipTo.setCompany('Thyme for Tea');
    // shipTo.setAddress('12 Main Street');
    // shipTo.setCity('Pecan Springs');
    // shipTo.setState('TX');
    // shipTo.setZip('44628');
    // shipTo.setCountry('USA');

    var lineItem_id1 = new ApiContracts.LineItemType();
    // lineItem_id1.setItemId('1');
    // lineItem_id1.setName('vase');
    // lineItem_id1.setDescription('cannes logo');
    // lineItem_id1.setQuantity('18');
    // lineItem_id1.setUnitPrice(45.00);

    var lineItem_id2 = new ApiContracts.LineItemType();
    // lineItem_id2.setItemId('2');
    // lineItem_id2.setName('vase2');
    // lineItem_id2.setDescription('cannes logo2');
    // lineItem_id2.setQuantity('28');
    // lineItem_id2.setUnitPrice('25.00');

    var lineItemList = [];
    lineItemList.push(lineItem_id1);
    lineItemList.push(lineItem_id2);

    var lineItems = new ApiContracts.ArrayOfLineItem();
    // lineItems.setLineItem(lineItemList);

    var userField_a = new ApiContracts.UserField();
    userField_a.setName('A');
    userField_a.setValue('Aval');

    // var userField_b = new ApiContracts.UserField();
    // userField_b.setName('B');
    // userField_b.setValue('Bval');

    // var userFieldList = [];
    // userFieldList.push(userField_a);
    // userFieldList.push(userField_b);

    // var userFields = new ApiContracts.TransactionRequestType.UserFields();
    // userFields.setUserField(userFieldList);

    // var transactionSetting1 = new ApiContracts.SettingType();
    // transactionSetting1.setSettingName('duplicateWindow');
    // transactionSetting1.setSettingValue('120');

    // var transactionSetting2 = new ApiContracts.SettingType();
    // transactionSetting2.setSettingName('recurringBilling');
    // transactionSetting2.setSettingValue('false');

    // var transactionSettingList = [];
    // transactionSettingList.push(transactionSetting1);
    // transactionSettingList.push(transactionSetting2);

    // var transactionSettings = new ApiContracts.ArrayOfSetting();
    // transactionSettings.setSetting(transactionSettingList);

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(body?.product?.amount);
    transactionRequestType.setLineItems(lineItems);
    // transactionRequestType.setUserFields(userFields);
    transactionRequestType.setOrder(orderDetails);
    // transactionRequestType.setTax(tax);
    // transactionRequestType.setDuty(duty);
    transactionRequestType.setShipping(shipping);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);
    // transactionRequestType.setTransactionSettings(transactionSettings);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    //Defaults to sandbox
    //ctrl.setEnvironment(SDKConstants.endpoint.production);

    return await ctrl.execute(async function () {

        var apiResponse = ctrl.getResponse();

        var response = new ApiContracts.CreateTransactionResponse(apiResponse);
        console.log("🚀 ~ response:", response, response.getTransactionResponse()?.transId)

        //pretty print response
        console.log(JSON.stringify(response, null, 2));

        if (response != null) {
            if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                if (response.getTransactionResponse().getMessages() != null) {
                    console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
                    console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
                    console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
                    console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
                    const cart = await updateCart(body?.product?.cart_id, { cardNumber: body?.encryptedCardData?.cardNumber, expiryDate: body?.encryptedCardData?.expDate, transactionId: response.getTransactionResponse()?.transId, networkTransId: response?.getTransactionResponse()?.networkTransId, status: "Ordered", transactionStatus: "Success", platform: "authorized" })
                    return callback(cart)


                }
                else {
                    console.log('Failed Transaction.');
                    if (response.getTransactionResponse().getErrors() != null) {
                        console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                        console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                    }

                }
            }
            else {
                console.log('Failed Transaction. ');
                if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {

                    console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                    console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                }
                else {
                    console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                    console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                }
            }
            return callback({ error: response, status: 500 });
        }
        else {
            return callback({ error: "Something went wrong", status: 500 });
        }

    });
}

const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET,
        ).toString("base64");
        const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

const createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
    console.log(
        "shopping cart information passed from the frontend createOrder() callback:",
        cart,
    );

    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_BASE_URL}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: cart?.amount,
                },
            },
        ],
    };

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
        method: "POST",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};

const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
    });

    return handleResponse(response);
};

async function handleResponse(response) {
    try {
        const jsonResponse = await response.json();
        console.log("🚀 ~ handleResponse ~ jsonResponse:", jsonResponse)
        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

const createStripePaymentIntent = async (paymentItems, amount) => {
    console.log("🚀 ~ createStripePaymentIntent ~ amount:", amount)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });
    console.log("🚀 ~ createStripePaymentIntent ~ paymentIntent:", paymentIntent)

    return ({ clientSecret: paymentIntent.client_secret });
}

const stripeSessionStatus = async (session_id) => {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("🚀 ~ stripeSessionStatus ~ session:", session)


}

module.exports = {
    getAnAcceptPaymentPage, chargeCreditCard, captureOrder, createOrder, createStripePaymentIntent, stripeSessionStatus, generateAccessToken
}