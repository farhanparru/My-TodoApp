const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // remove white space
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User',userSchema )