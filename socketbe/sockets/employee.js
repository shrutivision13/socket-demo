const { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controller/employee');


module.exports = (io) => {
    // console.log(socket.handshake.url);
    // console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    const emitEmployees = async (data) => {
        const employees = await getAllEmployees(data);
        io.emit("server:loademployees", employees);
    };
    // emitEmployees();

    io.on("client:newemployee", async (data) => {
        const newEmployee = await addEmployee(data);
        if (newEmployee?.status === 200)
            emitEmployees(data);
        io.emit("server:newemployee", newEmployee);
    });
    io.on("client:employees", async (data) => {
        // const newEmployee = await addEmployee(data);
        emitEmployees(data);
    });

    io.on("client:deleteemployee", async (employeeId) => {

        let res = await deleteEmployee(employeeId);
        if (res?.status === 200)
            emitEmployees();
        io.emit("server:deleteemployee", res);
    });

    io.on("client:getemployee", async (employeeId) => {
        const employee = await getEmployeeById(employeeId);
        io.emit("server:selectedemployee", employee);
    });

    io.on("client:updateemployee", async (updatedEmployee) => {
        let res = await updateEmployee(updatedEmployee);
        if (res?.status === 200)
            emitEmployees();
        io.emit("server:updateemployee", res);
    });

    io.on("disconnect", () => {
        console.log(io.id, "disconnected");
    });
};