// User.js
const { DataTypes } = require("sequelize");
const mySql = require("../database/init.sqlServer"); // import sequelize instance

const UserBooking = mySql.define(
  "UserBooking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      field: "full_name", // Tên trường trong bảng có chữ hoa và dấu gạch dưới
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: "phone_number", // Tên trường trong bảng có chữ hoa và dấu gạch dưới
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "UserBooking", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Không tự động thêm các trường createdAt và updatedAt
  }
);

module.exports = { UserBooking };
