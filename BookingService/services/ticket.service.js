const VehicleDAO = require("../DAO/Vehicle.DAO");
const TicketDAO = require("../DAO/Ticket.DAO");
const ScheduleDAO = require("../DAO/schedule.DAO");
const { HOST_USER_API_SERVICE } = require("../config/API.config");
const { Schedule } = require("../models/Schedule.model");
// const fetch = require("node-fetch");

const TicketService = {
  async createTicket(data) {
    try {
      const { scheduleId, price, customerId, phoneContact, pickupLocation } = data;

      const schedule = await ScheduleDAO.getScheduleById(scheduleId);
      if (!schedule) {
        return new Error("Khong co schedule");
      }

      const vehicleTotalSlot = schedule.vehicleId.totalSlot;

      const unavailableSlot = schedule.ticketIds.length;

      // Kiểm tra nếu xe full ghế thì báo lỗi, nếu còn chỗ thì tạo vé, nếu còn slot cuối cùng thì báo lịch trình đó hết vé

      if (vehicleTotalSlot > unavailableSlot) {
        const ticketData = await TicketDAO.createTicket({
          scheduleId,
          price,
          customerId,
          phoneContact,
          pickupLocation,
        });

        // Lấy ra schedule cần cập nhật
        const schedule = await Schedule.findById(scheduleId);

        // Thêm ticketId mới vào trường ticketIds của schedule
        schedule.ticketIds.push(ticketData._id);

        // Lưu cập nhật vào MongoDB
        await schedule.save();

        const slotCheck = unavailableSlot + 1;

        if (vehicleTotalSlot == slotCheck) {
          await ScheduleDAO.updateSchedule(scheduleId, {
            status: "sold_out",
          });
        }
        return ticketData;
      } else return new Error("Xe hết chỗ");
    } catch (error) {
      return new Error(error);
    }
  },

  async getTicketInfo(ticketId) {
    try {
      // Lấy thông tin vé xe từ database
      const ticket = await TicketDAO.getTicketById(ticketId);
      if (!ticket) {
        throw new Error("Không tìm thấy vé xe");
      }

      // Lấy thông tin người dùng từ dịch vụ người dùng
      const response = await fetch(
        `${HOST_USER_API_SERVICE}/api/user/${ticket.customerId}`
      );
      if (!response.ok) {
        throw new Error("Không thể lấy thông tin người dùng từ dịch vụ User");
      }

      const userData = await response.json(); // Chuyển đổi dữ liệu JSON trả về từ dịch vụ người dùng

      // Trả về thông tin vé xe kèm thông tin người dùng
      return {
        ticket, userData
      };
    } catch (error) {
      return new Error(error);
    }
  },

  async deleteTicket(ticketId) {
    try {
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = TicketService;
