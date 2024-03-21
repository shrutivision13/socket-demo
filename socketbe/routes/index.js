var express = require('express');
const employeeRouter = require('../routes/employee');
const designationRouter = require('../routes/employee');
const departmentRouter = require('../routes/employee');
var router = express.Router();

// /* GET users listing. */
// router.get('/', async function (req, res, next) {
//   // return all Socket instances of the main namespace
//   // const sockets = await io.fetchSockets();
//   // console.log("🚀 ~ sockets:", sockets)
//   req.io.emit('message', { data: 'examples data' });
//   req.socket.emit('message', { data: 'example data' });
//   res.json({ msg: 'respond with a resource' });
// });

router.use("/employee", employeeRouter)
router.use("/designation", designationRouter)
router.use("/department", departmentRouter)


module.exports = router;
