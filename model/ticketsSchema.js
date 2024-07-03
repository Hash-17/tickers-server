const mongoose = require("mongoose");

const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    base_unit: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    sell: {
      type: String,
      required: true,
    },
    buy: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ticketsModel = mongoose.model("tickets", ticketSchema);

module.exports = ticketsModel;
