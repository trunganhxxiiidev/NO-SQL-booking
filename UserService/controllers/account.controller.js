// controllers/AccountController.js
const UserDAO = require("../DAO/user.DAO");

const AccountController = {
  async Login(req, res) {
    try {
      const { username, password } = req.body;
      const responseData = await UserDAO.getUserByUsername(username);

      if (responseData.password == password) {
        return res.json({
          status: true,
          data: {
            id: responseData.id,
            fullName: responseData.fullName,
            username: responseData.username,
            phoneNumber: responseData.phoneNumber,
            address: responseData.address,
          },
        });
      } else {
        return res.status(500).json({
          status: false,
          message: "Tên đăng nhập hoặc mật khẩu không trùng khớp",
        });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({
        status: false,
        message: "Lỗi đăng nhập",
      });
    }
  },

  async ChangePassword(req, res) {
    try {
      const { username, password, newPassword } = req.body;
      const responseData = await UserDAO.getUserByUsername(username);

      if (responseData.password == password) {
        await UserDAO.updateUser(responseData.id, {
          password: newPassword,
        });
        res.status(200).json({
          status: true,
          message: "Đổi mật khẩu thành công",
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Tên đăng nhập hoặc mật khẩu không trùng khớp",
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).json({ status: "Lỗi:", error: error });
    }
  },
};

module.exports = AccountController;
