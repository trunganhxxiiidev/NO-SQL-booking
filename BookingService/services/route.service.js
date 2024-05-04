const ScheduleDAO = require("../DAO/schedule.DAO");
const VehicleDAO = require("../DAO/Vehicle.DAO");
const RouteDAO = require("../DAO/Route.DAO");

const redisClient = require('../redis/init.redis');


const RouteService = {
  async getAllRoutes() {
    try {
        // Kiểm tra xem liệu thông tin tuyến đường đã được lưu trong Redis hay chưa
      const cachedData = await redisClient.get('allRoutes');
      if (cachedData) {
        console.log('Dữ liệu tuyến đường đã được lấy từ Redis.');
        return JSON.parse(cachedData);
      }

      // Nếu không có trong Redis, thực hiện truy vấn cơ sở dữ liệu
      const routes = await RouteDAO.getAllRoutes();
      if (!routes || routes.length === 0) {
        return null;
      }

      // Lưu thông tin tất cả các tuyến đường vào Redis để cache
      await redisClient.set('allRoutes', JSON.stringify(routes));
      return routes;
    } catch (error) {
      return error;
    }
  },

  async updateRoute(routeId, newData) {
    try {
      const updatedRoute = await RouteDAO.updateRoute(routeId, newData);

      // Cập nhật lại cache trong Redis sau khi cập nhật thành công
      await redisClient.del('allRoutes');
      console.log('Dữ liệu tuyến đường đã được cập nhật trong Redis.');

      return updatedRoute;
    } catch (error) {
      return new Error(error);
    }
  },


  async createRoute(newData) {
    try {
      const createDAO = await RouteDAO.createRoute(newData);

      // Cập nhật lại cache trong Redis sau khi cập nhật thành công
      await redisClient.del('allRoutes');
      console.log('Dữ liệu tuyến đường đã được reset trong Redis.');

      return createDAO;
    } catch (error) {
      return new Error(error);
    }
  },

  async deleteRoute(routeId) {
    try {
      await RouteDAO.deleteRoute(routeId);

      // Xóa thông tin tuyến đường cần xóa khỏi cache trong Redis sau khi xóa thành công
      await redisClient.del('allRoutes');
      console.log('Dữ liệu tuyến đường đã được xóa khỏi Redis.');

      return true;
    } catch (error) {
      return new Error(error);
    }
  }

  
};

module.exports = RouteService;
