const { register, signIn } = require('../controller/auth');
const { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controller/employee');


module.exports = (io) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client

    // emitEmployees();

    io.on("client:signin", async (data) => {
        const res = await signIn(data);

        io.emit("server:signin", res);
    });


    io.on("client:signup", async (data) => {

        let res = await register(data);

        io.emit("server:signup", res);
    });



    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};