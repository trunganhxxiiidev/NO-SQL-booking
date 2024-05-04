// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Route để tạo người dùng mới
router.post('/', UserController.createUser);

router.get('/', UserController.getAllUsers);

// Route để lấy thông tin người dùng theo ID
router.get('/:id', UserController.getUserById);

// Route để cập nhật thông tin người dùng
router.put('/:id', UserController.updateUser);

// Route để xóa người dùng
router.delete('/:id', UserController.deleteUser);

module.exports = router;
