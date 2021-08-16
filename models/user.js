const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
    minlength: 10,
  },
  userPassword: {
    type: String,
    required: true,
    minlength: 8,
  },
  userImage: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("User", userSchema);
