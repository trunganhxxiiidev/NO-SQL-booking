const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  ticketIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  status: {
    type: String,
    enum: ['available', 'sold_out'],
    required: true,
    default: "available"
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = { Schedule };
