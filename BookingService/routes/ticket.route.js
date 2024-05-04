const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/Ticket.conntroller');

// Định nghĩa các route cho Ticket
router.post('/', TicketController.createTicket);
router.get('/', TicketController.getAllTickets);
router.get('/:id', TicketController.getTicketById);
router.put('/:id', TicketController.updateTicket);
router.delete('/:id', TicketController.deleteTicket);

module.exports = router;
