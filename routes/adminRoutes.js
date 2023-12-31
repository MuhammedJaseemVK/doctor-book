const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require("../controllers/adminCtrl")
const router = express.Router();

router.get('/get-all-users', authMiddleware, getAllUsersController);
router.get('/get-all-doctors', authMiddleware, getAllDoctorsController);
router.post('/change-account-status',authMiddleware,changeAccountStatusController);

module.exports = router;