const RouteDAO = require('../DAO/Route.DAO');
const RouteService = require('../services/route.service');

const RouteController = {
  async createRoute(req, res) {
    try {
      const routeData = req.body;
      const newRoute = await RouteService.createRoute(routeData)
      res.status(201).json(newRoute);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllRoutes(req, res) {
    try {
      const routes = await RouteService.getAllRoutes();
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getRouteById(req, res) {
    try {
      const routeId = req.params.id;
      const route = await RouteDAO.getRouteById(routeId);
      if (!route) {
        return res.status(404).json({ message: 'Không tìm thấy tuyến đường' });
      }
      res.status(200).json(route);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateRoute(req, res) {
    try {
      const routeId = req.params.id;
      const updateData = req.body;
      const updatedRoute = await RouteService.updateRoute(routeId, updateData);
      res.status(200).json(updatedRoute);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteRoute(req, res) {
    try {
      const routeId = req.params.id;
      await RouteService.deleteRoute(routeId);
      res.status(204).json({
        message: "Xóa thành công"
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = RouteController;
