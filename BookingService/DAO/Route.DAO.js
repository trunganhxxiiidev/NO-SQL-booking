const { Route } = require("../models/Route.model");

const RouteDAO = {
  async createRoute(routeData) {
    try {
      const newRoute = await Route.create(routeData);
      return newRoute;
    } catch (error) {
      console.error("Lỗi khi tạo tuyến đường:", error);
      throw error;
    }
  },

  async getAllRoutes() {
    try {
      const routes = await Route.find();
      return routes;
    } catch (error) {
      throw new Error("Đã xảy ra lỗi khi truy vấn tất cả tuyến đường");
    }
  },

  async getRouteById(routeId) {
    try {
      const route = await Route.findById(routeId);
      return route;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tuyến đường theo ID:", error);
      throw error;
    }
  },

  async updateRoute(routeId, updateData) {
    try {
      const updatedRoute = await Route.findByIdAndUpdate(routeId, updateData, {
        new: true,
      });
      return updatedRoute;
    } catch (error) {
      console.error("Lỗi khi cập nhật tuyến đường:", error);
      throw error;
    }
  },

  async deleteRoute(routeId) {
    try {
      await Route.findByIdAndDelete(routeId);
    } catch (error) {
      console.error("Lỗi khi xóa tuyến đường:", error);
      throw error;
    }
  },
};

module.exports = RouteDAO;
