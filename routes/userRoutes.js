const express = require("express");
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookappointmentController, checkBookingAvailabilityController, getUserAppointmentsController } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUserData', authMiddleware, authController);
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.post('/get-all-notification', authMiddleware, getAllNotificationController);
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);
router.get('/get-all-doctors', authMiddleware, getAllDoctorsController);
router.post('/book-appointment', authMiddleware, bookappointmentController);
router.post('/check-booking-availability', authMiddleware, checkBookingAvailabilityController);
router.get('/user-appointments', authMiddleware, getUserAppointmentsController);

module.exports = router