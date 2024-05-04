// routes/userRoutes.js
const express = require("express");
const VehicleController = require("../controllers/Vehicle.controller");
const router = express.Router();

// Định nghĩa các route cho Vehicle
router.post("/", VehicleController.createVehicle);
router.get("/", VehicleController.getAllVehicles);
router.get("/:id", VehicleController.getVehicleById);
router.put("/:id", VehicleController.updateVehicle);
router.delete("/:id", VehicleController.deleteVehicle);

module.exports = router;
