const ScheduleDAO = require("../DAO/schedule.DAO");
const ScheduleService = require("../services/schedule.service");

const ScheduleController = {
  async createSchedule(req, res) {
    try {
      const scheduleData = req.body;
      const newSchedule = await ScheduleService.createSchedule(scheduleData);
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllSchedules(req, res) {
    try {
      const schedules = await ScheduleService.getSchedule(req.query)
      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getScheduleById(req, res) {
    try {
      const scheduleId = req.params.id;
      const schedule = await ScheduleDAO.getScheduleById(scheduleId);
      if (!schedule) {
        return res.status(404).json({ message: "Không tìm thấy lịch trình" });
      }
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateSchedule(req, res) {
    try {
      const scheduleId = req.params.id;
      const updateData = req.body;
      const updatedSchedule = await ScheduleDAO.updateSchedule(
        scheduleId,
        updateData
      );
      res.status(200).json(updatedSchedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteSchedule(req, res) {
    try {
      const scheduleId = req.params.id;
      await ScheduleDAO.deleteSchedule(scheduleId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ScheduleController;
