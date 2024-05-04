const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/Schedule.controller');

// Định nghĩa các route cho Schedule
router.post('/', ScheduleController.createSchedule);
router.get('/', ScheduleController.getAllSchedules);
router.get('/:id', ScheduleController.getScheduleById);
router.put('/:id', ScheduleController.updateSchedule);
router.delete('/:id', ScheduleController.deleteSchedule);

module.exports = router;
