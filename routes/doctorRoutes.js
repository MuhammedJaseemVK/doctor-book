const express = require("express");
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/get-doctor-info", authMiddleware, getDoctorInfoController);
router.post("/update-profile", authMiddleware, updateProfileController);
router.post('/get-doctor-by-id', authMiddleware, getDoctorByIdController);
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController);
router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;