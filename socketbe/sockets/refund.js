const { addCart, getAllCarts, getCartById, updateCart, deleteCart, rmeoveCart, getAllOrders, getAllTransaction } = require('../controller/cart');
const { paypalRefund, stripeRefund, refundTransaction } = require('../controller/refund');


module.exports = (io) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client

    // emitCarts();

    io.on("client:refund", async (data) => {
        console.log("🚀 ~ io.on ~ data:", data)
        // const newCart = await addCart(data);
        let refund
        if (data?.platform === "paypal") {
            refund = await paypalRefund(data?.payment_id, data?.id, data?.status)
            io.emit("server:refund", refund);

        }
        if (data?.platform === "stripe") {
            refund = await stripeRefund(data?.payment_id, data?.id, data?.status)
            io.emit("server:refund", refund);

        }

        if (data?.platform === "authorized") {
            const paymentDetails = await getCartById(data?.id);
            console.log("🚀 ~ io.on ~ paymentDetails:", paymentDetails)
            refund = await refundTransaction(data?.payment_id, paymentDetails?.data, async (res) => {
                console.log("🚀 ~ refund=awaitrefundTransaction ~ data:", res?.messages, res?.messages?.resultCode == "Ok")
                if (res?.messages?.resultCode == "Ok") {
                    await updateCart(data?.id, { status: data?.status, transactionStatus: "Refund" })
                    io.emit("server:refund", { status: 200, message: "Refund Complete" })
                } else {
                    io.emit("server:refund", { status: 500, error: res?.messages?.message?.[0].text })
                }
            })
        }
        // console.log("🚀 ~ io.on ~ refund:", refund)
        // // if (newCart?.status === 200)
        // //     emitCarts(data);
        // io.emit("server:refund", refund);
    });


    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};