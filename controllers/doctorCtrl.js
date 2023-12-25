const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({ success: true, message: "doctor data fetch details success", data: doctor })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error fetching doctor details' })
    }
}

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({ success: true, message: "Doctor profile updated", data: doctor });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error while updating doctor profile", error })
    }
}

const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({ success: true, message: "Single doctor info fetched", data: doctor })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: true, message: "Error in single doctor info", error });
    }
}

module.exports = {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController
}