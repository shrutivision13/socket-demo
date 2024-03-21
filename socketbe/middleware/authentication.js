const jwt = require("jsonwebtoken")
module.exports = (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log("🚀 ~ authenticateSocket ~ token:", token)
    if (!token) {
        // return next(new Error('Authentication token required'));
        next();
        return
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        console.log("🚀 ~ decoded:", decoded)
        socket.userId = decoded?._id; // Store the user ID for authorization checks
        next();
    } catch (error) {
        console.log("🚀 ~ error:", error)
        // return ({ error: error, status: 500 })
        next(new Error('Invalid authentication token'));
    }
};