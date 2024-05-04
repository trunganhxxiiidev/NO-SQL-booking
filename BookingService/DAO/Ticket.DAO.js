const { Ticket } = require("../models/Ticket.model");

const TicketDAO = {
  async createTicket(ticketData) {
    try {
      const newTicket = await Ticket.create(ticketData);
      return newTicket;
    } catch (error) {
      console.error("Lỗi khi tạo vé xe:", error);
      throw new Error(error);
    }
  },

  async getAllTickets(query) {
    try {

      if (query.customerId) {
        const tickets = await Ticket.find({
          customerId: query.customerId
        }).populate({
          path: 'scheduleId',
          populate: {
            path: 'routeId'
          }
        });
        return tickets;
      }
      const tickets = await Ticket.find();
      return tickets;
    } catch (error) {
      throw new Error("Đã xảy ra lỗi khi truy vấn tất cả vé xe");
    }
  },

  async getTicketById(ticketId) {
    try {
      const ticket = await Ticket.findById(ticketId);
      return ticket;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin vé xe theo ID:", error);
      throw error;
    }
  },

  async updateTicket(ticketId, updateData) {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        updateData,
        { new: true }
      );
      return updatedTicket;
    } catch (error) {
      console.error("Lỗi khi cập nhật vé xe:", error);
      throw error;
    }
  },

  async deleteTicket(ticketId) {
    try {
      await Ticket.findByIdAndDelete(ticketId);
    } catch (error) {
      console.error("Lỗi khi xóa vé xe:", error);
      throw error;
    }
  },
};

module.exports = TicketDAO;
