const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ success: false, message: "User already exists" });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ success: true, message: "Register successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register Controller :${error.message}` })
    }
}

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({ success: false, message: "User doesnot exists" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ success: false, message: "invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ success: true, message: "Login suceess", token })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Error in login controller :${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({ success: false, message: "user not found" })
        }
        else {
            res.status(200).send({
                success: true, data: {
                    name: user.name,
                    email: user.email
                }
            })
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Auth error" })
    }
}


module.exports = { loginController, registerController, authController }