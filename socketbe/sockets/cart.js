const { addCart, getAllCarts, getCartById, updateCart, deleteCart, rmeoveCart, getAllOrders, getAllTransaction } = require('../controller/cart');


module.exports = (io) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    const emitCarts = async (data) => {
        const carts = await getAllCarts(io?.userId);
        io.emit("server:loadcarts", carts);
    };
    // emitCarts();

    io.on("client:addcart", async (data) => {
        const newCart = await addCart(data, io?.userId);
        // if (newCart?.status === 200)
        //     emitCarts(data);
        io.emit("server:addcart", newCart);
    });
    io.on("client:carts", async (data) => {
        emitCarts(data);
    });

    io.on("client:orders", async (data) => {
        const allOrders = await getAllOrders(data, io?.userId);
        io.emit("server:orders", allOrders);
    });
    io.on("client:transactions", async (data) => {
        const allTransaction = await getAllTransaction(data, io?.userId);
        io.emit("server:transactions", allTransaction);
    });

    io.on("client:deletecart", async (data) => {
        let res = await rmeoveCart(data);
        if (res?.status === 200)
            emitCarts();
        io.emit("server:deletecart", res);
    });

    io.on("client:getcart", async (cartId) => {
        const cart = await getCartById(cartId);
        io.emit("server:selectedcart", cart);
    });

    io.on("client:updatecart", async (updatedCart, body) => {
        let res = await updateCart(updatedCart, body);
        if (res?.status === 200)
            emitCarts();
        io.emit("server:updatecart", res);
    });

    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};