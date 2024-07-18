const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  passwordHash: {
    type: String,
    required: [true, "Please provide a name"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
