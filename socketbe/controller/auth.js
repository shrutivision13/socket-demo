const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require('bcrypt');

const signIn = async (body, res) => {
    try {
        const { email, password } = body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return ({ status: 404, error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, findUser?.password);
        if (!isMatch) {
            return ({ status: 400, error: "Incorrect password" });
        }
        const token = jwt.sign({ _id: findUser?._id, role: findUser?.role, email: findUser?.email }, "secret");
        await findUser.save()
        return ({ status: 200, message: "Sign in successful", data: { user: findUser, token } });
    } catch (err) {
        console.log("🚀 ~ signIn ~ err:", err)
        return ({ status: 500, error: err.message });
    }
}





// register a new user to system
const register = async (body, res) => {
    try {
        const findAdmin = await User.findOne({ email: body?.email });
        if (findAdmin) {
            return ({ status: 400,error: "User already exist" });

        }
        const hashedPassword = await bcrypt.hash(body?.password, 10);
        const user = new User({
            ...body,
            password: hashedPassword,
        });
        await user.save();
        return ({ status: 200, message: "User registered successfully", data: { user } });

    } catch (err) {
        console.log("🚀 ~ signIn ~ err:", err)
        return ({ status: 500, error: err.message });
    }
}

// generate a new toke if last in expires
const regenerateToken = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const oldToken = req?.headers?.authorization?.replace("Bearer ", "")
        if (oldToken !== findUser?.accessToken) {
            return res.status(400).json({ error: "Invalid token" });
        }
        const token = jwt.sign({ _id: findUser?._id, role: findUser?.role, email: findUser?.email }, process.env.JWT_SECRET);
        findUser.accessToken = token
        await findUser.save()
        return ({ status: 200, message: "token generated successful", data: { user: findUser } });
    } catch (err) {
        return ({ status: 500, error: err.message });
    }
}

module.exports = { signIn, regenerateToken, register }