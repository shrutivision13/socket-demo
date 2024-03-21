const { addDesignation, getAllDesignations, getDesignationById, updateDesignation, deleteDesignation } = require('../controller/designation');


module.exports = (io) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    const emitDesignations = async () => {
        const designations = await getAllDesignations();
        io.emit("server:loaddesignations", designations);
    };
    // emitDesignations();

    io.on("client:newdesignation", async (data) => {
        const newDesignation = await addDesignation(data);
        if (newDesignation?.status === 200)
            emitDesignations()
        io.emit("server:newdesignation", newDesignation);
    });
    io.on("client:designations", async (data) => {
        emitDesignations()
    });

    io.on("client:deletedesignation", async (designationId) => {
        let res = await deleteDesignation(designationId);
        if (res?.status === 200)
            emitDesignations();
        io.emit("server:deletedesignation", res);
    });

    io.on("client:getdesignation", async (designationId) => {
        const designation = await getDesignationById(designationId);
        io.emit("server:selecteddesignation", designation);
    });

    io.on("client:updatedesignation", async (updatedDesignation) => {
        let res = await updateDesignation(updatedDesignation);
        if (res?.status === 200)
            emitDesignations();
        io.emit("server:updatedesignation", res);
    });

    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};