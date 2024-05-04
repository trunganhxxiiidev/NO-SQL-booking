// DAO/user.js
const { UserBooking } = require("../models/userBooking.model");

const userDAO = {
  async createUser(userData) {
    try {
      const newUser = await UserBooking.create(userData);
      return newUser;
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
      throw error;
    }
  },

  async getAllUsers() {
    try {
      const users = await UserBooking.findAll();
      return users;
    } catch (error) {
      throw new Error("Đã xảy ra lỗi khi truy vấn người dùng");
    }
  },

  async getUserById(userId) {
    try {
      const user = await UserBooking.findByPk(userId);
      return user;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng theo ID:", error);
      throw error;
    }
  },

  async getUserByUsername(username) {
    try {
      const user = await UserBooking.findOne({ where: { username } });
      console.log(user.dataValues, "Thong tin user");
      return user.dataValues ? user.dataValues : {};
    } catch (error) {
      throw new Error("Đã xảy ra lỗi khi truy vấn thông tin người dùng");
    }
  },

  async updateUser(userId, userData) {
    try {
      const user = await UserBooking.findByPk(userId);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      await user.update(userData);
      return user;
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const user = await UserBooking.findByPk(userId);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      await user.destroy();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      throw error;
    }
  },
};

module.exports = userDAO;
