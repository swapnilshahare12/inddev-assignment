const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    company_name: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: Number,
    },
    email: {
      type: String,
    },
    web: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
