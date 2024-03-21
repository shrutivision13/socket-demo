const { addWishlist, removeWishlist, getAllWishlist } = require('../controller/wishlist');


module.exports = (io, socket) => {
    t
    const emitCarts = async (data) => {
        const carts = await getAllWishlist(io?.userId);
        io.emit("server:wishlists", carts);
    };
    // emitCarts();

    io.on("client:addtowishlist", async (productid, userid) => {
        const newCart = await addWishlist(productid, io?.userId);
        // if (newCart?.status === 200)
        //     emitCarts(data);
        io.emit("server:addtowishlist", newCart);
    });
    io.on("client:wishlists", async (data) => {
        // const newCart = await addCart(data);
        emitCarts(io?.userId);
    });

    io.on("client:removefromwishlist", async (data) => {

        let res = await removeWishlist(data);
        if (res?.status === 200)
            emitCarts();
        io.emit("server:removefromwishlist", res);
    });


    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};