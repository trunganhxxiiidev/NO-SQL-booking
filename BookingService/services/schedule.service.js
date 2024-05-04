const ScheduleDAO = require("../DAO/schedule.DAO");
const VehicleDAO = require("../DAO/Vehicle.DAO");
const RouteDAO = require("../DAO/Route.DAO");
// const { client, TIME_LIMIT } = require("../redis/init.redis");
async function checkVehicleIsReady(vehicalId, startTime) {
  try {
    const vehicalData = await VehicleDAO.getVehicleById(vehicalId);

    if (!vehicalData) {
      return new Error("Khong tim thay Id xe");
    }

    const scheduleDupplicate = vehicalData.schedules.find((e) => {
      e.endTime >= startTime;
    });

    if (scheduleDupplicate) {
      return new Error("Xe đã có lịch trình, vui lòng chọn thời gian khác");
    }

    return true;
  } catch (error) {
    return error;
  }
}

const ScheduleService = {
  async createSchedule(data) {
    try {
      const { routeId, vehicleId, startTime } = data;
      // Kiểm tra nếu xe full ghế thì báo lỗi
      if (!checkVehicleIsReady(vehicleId)) {
        return new Error("Có gì đó sai sai o vehicle");
      }
      let endTime;
      const routeData = await RouteDAO.getRouteById(routeId);
      if (!routeData) {
        return new Error("Có gì đó sai sai o route");
      }

      endTime = startTime + routeData.estimatedTime;
      const newSchedule = await ScheduleDAO.createSchedule({
        routeId,
        vehicleId,
        startTime,
        endTime,
      });
      return newSchedule;
    } catch (error) {
      return error;
    }
  },

  async getSchedule(filter) {
    console.log(filter, "filter");
    try {
      let from = 0;
      let to = 9999999999;

      if (filter && filter.from) {
        from = filter.from;
      }

      if (filter && filter.to) {
        to = filter.to;
      }

      let schedules;
      if (filter && filter.routeId) {
        schedules = await ScheduleDAO.getSchedulesByRouteIdAndTime(
          filter.routeId,
          from,
          to
        );
      } else {
        schedules = await ScheduleDAO.getAllSchedules();
      }

      // Tính toán và thêm trường availableSlot cho mỗi lịch trình
      schedules = schedules.map((schedule) => {
        // Tính số ghế còn trống
        const availableSlot =
          schedule.vehicleId.totalSlot - schedule.ticketIds.length;

        // Thêm trường availableSlot vào lịch trình và trả về
        return {
          ...schedule.toObject(),
          availableSlot,
        };
      });

      return schedules;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ScheduleService;
