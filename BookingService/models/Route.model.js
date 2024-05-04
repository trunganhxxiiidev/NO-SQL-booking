const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = { Route };
