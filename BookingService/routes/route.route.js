const express = require('express');
const router = express.Router();
const RouteController = require('../controllers/Route.controller');

// Định nghĩa các route cho "Tuyến đường"
router.post('/', RouteController.createRoute);
router.get('/', RouteController.getAllRoutes);
router.get('/:id', RouteController.getRouteById);
router.put('/:id', RouteController.updateRoute);
router.delete('/:id', RouteController.deleteRoute);

module.exports = router;
