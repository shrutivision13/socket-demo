const { updateCart, getAllCarts } = require("../controller/cart");
const { chargeCreditCard, createOrder, captureOrder, createStripeSession, stripeSessionStatus, createStripePaymentIntent } = require("../controller/payment");


module.exports = (io) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    const emitCarts = async (data) => {
        console.log("🚀 ~ emitCarts ~ data:", data)
        const carts = await getAllCarts(data);
        console.log("🚀 ~ emitCarts ~ carts:", carts)
        io.emit("server:loadcarts", carts);
    };


    io.on("client:addPayment", async (data) => {
        console.log("🚀 ~ io.on ~ data:", data)
        const payment = await chargeCreditCard(data, (payment) => {
            if (payment?.status === 200) {
                emitCarts()
            }
            io.emit("server:addPayment", payment);

        });


    });
    io.on("client:createpaypalorder", async (data) => {
        console.log("🚀 ~ io.on ~ data:", data)
        const payment = await createOrder(data);
        console.log("🚀 ~ io.on ~ payment:", payment)
        if (payment?.status === 200) {
            // emitCarts()
        }
        io.emit("server:createpaypalorder", payment);


    });
    io.on("client:captureorder", async (data) => {
        console.log("🚀 ~ io.on ~ data:", data)
        const payment = await captureOrder(data?.orderID);
        console.log("🚀 ~ io.on ~ payment:", payment)
        if (payment?.httpStatusCode === 201 && payment?.jsonResponse?.status === "COMPLETED") {
            await updateCart(data?.cart_id, { transactionId: payment?.jsonResponse?.purchase_units?.[0]?.payments.captures?.[0]?.id, networkTransId: payment?.jsonResponse?.id, status: "Ordered", transactionStatus: "Success" })
            emitCarts()
        }
        io.emit("server:captureorder", payment);


    });

    io.on("client:createstripepaymentintent", async (data, amount) => {
        console.log("🚀 ~ io.on ~ data:", data)
        const payment = await createStripePaymentIntent(data, amount);
        console.log("🚀 ~ io.on ~ payment:", payment)
        if (payment?.status === 200) {
            // emitCarts()
        }
        io.emit("server:createstripepaymentintent", payment);


    });
    io.on("client:stripesessionstatus", async (data) => {
        console.log("🚀 ~ io.on ~ data:", data)
        const payment = await stripeSessionStatus(data);
        console.log("🚀 ~ io.on ~ payment:", payment)
        if (payment?.status === 200) {
            // emitCarts()
        }
        io.emit("server:stripesessionstatus", payment);


    });

    // io.on("client:carts", async (data) => {
    //     console.log("🚀 ~ io.on ~ data:", data)
    //     // const newCart = await addCart(data);
    //     emitCarts(data);
    // });

    // io.on("client:deletecart", async (data) => {

    //     let res = await rmeoveCart(data);
    //     if (res?.status === 200)
    //         emitCarts();
    //     io.emit("server:deletecart", res);
    // });

    // io.on("client:getcart", async (cartId) => {
    //     const cart = await getCartById(cartId);
    //     io.emit("server:selectedcart", cart);
    // });

    // io.on("client:updatecart", async (updatedCart) => {
    //     let res = await updateCart(updatedCart);
    //     if (res?.status === 200)
    //         emitCarts();
    //     io.emit("server:updatecart", res);
    // });

    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};