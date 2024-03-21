const { addDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment } = require('../controller/department');


module.exports = (socket) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    const emitDepartments = async () => {
        const departments = await getAllDepartments();
        socket.emit("server:loaddepartments", departments);
    };
    // emitDepartments();

    socket.on("client:newdepartment", async (data) => {
        const newDepartment = await addDepartment(data);
        if (newDepartment?.status === 200)
            emitDepartments();
        socket.emit("server:newdepartment", newDepartment);
    });

    socket.on("client:departments", async (data) => {
        emitDepartments()
    });

    socket.on("client:deletedepartment", async (departmentId) => {
        let res = await deleteDepartment(departmentId);
        if (res?.status === 200)
            emitDepartments();
        socket.emit("server:deletedepartment", res);
    });

    socket.on("client:getdepartment", async (departmentId) => {
        const department = await getDepartmentById(departmentId);
        socket.emit("server:selecteddepartment", department);
    });

    socket.on("client:updatedepartment", async (updatedDepartment) => {
        let res = await updateDepartment(updatedDepartment);
        if (res?.status === 200)
            emitDepartments();
        socket.emit("server:updatedepartment", res);
    });

    socket.on("disconnect", () => {
        console.log(socket.id, "disconnected");
    });
};