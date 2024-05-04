// controllers/userController.js
const UserDAO = require("../DAO/user.DAO");

const UserController = {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserDAO.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
      res.status(500).json({ error: "Lỗi khi tạo người dùng" });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await UserDAO.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserDAO.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      }
      res.json(user);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      res.status(500).json({ error: "Lỗi khi lấy thông tin người dùng" });
    }
  },

  async updateUser(req, res) {
      try {
          const userId = req.params.id;
          const userData = req.body;
          const updatedUser = await UserDAO.updateUser(userId, userData);
          res.json(updatedUser);
      } catch (error) {
          console.error('Lỗi khi cập nhật thông tin người dùng:', error);
          res.status(500).json({ error: 'Lỗi khi cập nhật thông tin người dùng' });
      }
  },

  async deleteUser(req, res) {
      try {
          const userId = req.params.id;
          await UserDAO.deleteUser(userId);
          res.sendStatus(204);
      } catch (error) {
          console.error('Lỗi khi xóa người dùng:', error);
          res.status(500).json({ error: 'Lỗi khi xóa người dùng' });
      }
  }
};

module.exports = UserController;
