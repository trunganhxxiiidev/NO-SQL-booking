const express = require('express');

const router = express.Router();
const RouteRoute = require("./route.route") 
const ScheduleRoute = require("./schedule.route") 
const VehicleRoute = require("./vehicle.route") 
const TicketRoute = require("./ticket.route") 

router.use("/route", RouteRoute)
router.use("/schedule", ScheduleRoute)
router.use("/vehicle", VehicleRoute)
router.use("/ticket", TicketRoute)


module.exports = router