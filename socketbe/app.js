require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
const socketIo = require("socket.io");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cors = require("cors");
const employee = require("./sockets/employee");
const designation = require("./sockets/designation");
const department = require("./sockets/department");
const product = require("./sockets/product");
const cart = require("./sockets/cart");
const { getAnAcceptPaymentPage, generateAccessToken } = require("./controller/payment");
const payment = require("./sockets/payment");
const auth = require("./sockets/auth");
const wishlist = require("./sockets/wishlist");
const authentication = require("./middleware/authentication");
const refund = require("./sockets/refund");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use((req, res, next) => {
  req.io = io;
  next();
});


io.use(authentication)
io.on('connection', async client => {
  client.on("join_room", (room) => {
    client.join(room)
    io.to("socket_room-1").emit("receive_message", { message: `${room} joined` })
  })
  io.to("socket_room").emit("receive_message", { message: `${"socket_room"} joineds` })



  // getAnAcceptPaymentPage({ amount: 1200 })
  employee(client);
  designation(client);
  department(client);
  product(client);
  cart(client);
  payment(client);
  auth(client);
  wishlist(client, io);
  refund(client, io)
  // client.on("client:employees", async (data) => {
  //   console.log("🚀 ~ client.on ~ data:", data)

  // })

  client.on('disconnect', () => { /* … */ });
});

app.io = io;


// catch 404 and forward to error handler
app.use("/api/v1", indexRouter);
// app.use("/users", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});
// app.use();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = server;
