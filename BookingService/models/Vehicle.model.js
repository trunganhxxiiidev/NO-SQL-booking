const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  totalSlot: {
    type: Number,
    required: true,
    min: 1,
  },
  isReady: {
    type: Boolean,
    default: true
  },
  schedules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
  ],
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = { Vehicle };
