const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

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
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ success: false, message: "user not found" })
        }
        else {
            res.status(200).send({
                success: true, data: user
            })
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Auth error" })
    }
}

const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
        newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: 'Doctor account applied successfully'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while applying for doctor'
        })
    }
}

const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification = [];
        user.seenNotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({ success: true, message: "All notifications are marked as read", data: updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Something went wrong', error })
    }
}

const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seenNotification = [];
        const updatedUser = await user.save();
        user.password = undefined;
        res.status(200).send({ success: true, message: "All notifications are deleted", data: updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Unable to delete notifications" }, error);
    }
}

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: "approved" });
        res.status(200).send({ success: true, message: "All doctors", data: doctors });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching all dcotors", error })
    }
}

const bookappointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        req.body.status = "pending";
        const newappointment = new appointmentModel(req.body);
        await newappointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
            type: `New-appointmet-request`,
            message: `New appoitnmet request from ${req.body.userInfo.name}`,
            onClickPath: "/user/appointments"
        });
        await user.save();
        res.status(200).send({ success: true, message: "appointment booked successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error booking appointment", error })
    }
}

const checkBookingAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, "DD-MM-YYY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
        const toTime = moment(req.body.time).add(1, "1 hours").toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime,
                $lte: toTime
            }
        });
        if (appointments.length > 0) {
            return res.status(200).send({ success: true, message: "Appointments not Availibale at this time" });
        }
        else {
            return res.status(200).send({ success: true, message: "Appointments available" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error checking booking availability", error })
    }
}

const getUserAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.body.userId });
        res.status(200).send({ success: true, message: 'User appointments fetched successfully', data: appointments });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in user appointments", error })
    }
}

module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookappointmentController, checkBookingAvailabilityController, getUserAppointmentsController }