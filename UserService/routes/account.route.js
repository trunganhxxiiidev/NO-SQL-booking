// routes/userRoutes.js
const express = require('express');
const AccountController = require('../controllers/account.controller');
const router = express.Router();

// Route để tạo người dùng mới
router.post('/login', AccountController.Login);

router.post('/change-password', AccountController.ChangePassword);

module.exports = router;
