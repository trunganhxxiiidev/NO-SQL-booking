const { Vehicle } = require("../models/Vehicle.model");

const VehicleDAO = {
  async createVehicle(vehicleData) {
    try {
      const newVehicle = await Vehicle.create(vehicleData);
      return newVehicle;
    } catch (error) {
      console.error("Lỗi khi tạo phương tiện:", error);
      throw error;
    }
  },

  async getAllVehicles(filter) {
    try {
     
      const vehicles = await Vehicle.find();
      return vehicles
    } catch (error) {
      throw new Error("Đã xảy ra lỗi khi truy vấn tất cả phương tiện");
    }
  },

  async getVehicleById(vehicleId) {
    try {
      const vehicle = await Vehicle.findById(vehicleId);
      return vehicle;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phương tiện theo ID:", error);
      throw error;
    }
  },

  async updateVehicle(vehicleId, updateData) {
    try {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        vehicleId,
        updateData,
        { new: true }
      );
      return updatedVehicle;
    } catch (error) {
      console.error("Lỗi khi cập nhật phương tiện:", error);
      throw error;
    }
  },

  async deleteVehicle(vehicleId) {
    try {
      await Vehicle.findByIdAndDelete(vehicleId);
    } catch (error) {
      console.error("Lỗi khi xóa phương tiện:", error);
      throw error;
    }
  },
};

module.exports = VehicleDAO;
