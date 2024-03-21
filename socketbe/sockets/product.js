const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controller/product');


module.exports = (io) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    const emitProducts = async (data) => {
        const products = await getAllProducts(data);
        io.emit("server:loadproducts", products);
    };
    // emitProducts();

    io.on("client:newproduct", async (data) => {
        console.log("🚀 ~ io.on ~ data:", data)
        const newProduct = await addProduct(data);
        if (newProduct?.status === 200)
            emitProducts(data);
        io.emit("server:newproduct", newProduct);
    });
    io.on("client:products", async (data) => {
        console.log("🚀 ~ io.on ~ data:", data)
        // const newProduct = await addProduct(data);
        emitProducts(data);
    });

    io.on("client:deleteproduct", async (productId) => {

        let res = await deleteProduct(productId);
        if (res?.status === 200)
            emitProducts();
        io.emit("server:deleteproduct", res);
    });

    io.on("client:getproduct", async (productId) => {
        const product = await getProductById(productId);
        io.emit("server:selectedproduct", product);
    });

    io.on("client:updateproduct", async (updatedProduct) => {
        let res = await updateProduct(updatedProduct);
        if (res?.status === 200)
            emitProducts();
        io.emit("server:updateproduct", res);
    });

    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};