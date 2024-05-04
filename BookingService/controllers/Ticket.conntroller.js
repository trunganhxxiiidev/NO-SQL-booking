const TicketDAO = require("../DAO/Ticket.DAO");
const { Schedule } = require("../models/Schedule.model");
const TicketService = require("../services/ticket.service");

const TicketController = {
  async createTicket(req, res) {
    try {
      const ticketData = req.body;
      const newTicket = await TicketService.createTicket(ticketData);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async getAllTickets(req, res) {
    try {
      const tickets = await TicketDAO.getAllTickets(req.query);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async getTicketById(req, res) {
    try {
      const ticketId = req.params.id;
      const ticket = await TicketService.getTicketInfo(ticketId);
     
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async updateTicket(req, res) {
    try {
      const ticketId = req.params.id;
      const updateData = req.body;
      const updatedTicket = await TicketDAO.updateTicket(ticketId, updateData);
      res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async deleteTicket(req, res) {
    try {
      const ticketId = req.params.id;
      await TicketDAO.deleteTicket(ticketId);

      // Lấy schedule tương ứng với ticketId đã xóa
      const schedule = await Schedule.findOneAndUpdate(
        { ticketIds: ticketId },
        { $pull: { ticketIds: ticketId } },
        { new: true }
      );

      if (!schedule) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy lịch trình cho vé đã xóa" });
      }
      res.status(204).json({
        message: "Xóa thành công"
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

module.exports = TicketController;
