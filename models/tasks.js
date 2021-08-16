const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  reminder: {
    hasReminder: {
      type: Boolean,
      required: true,
    },
    dateTime: {
      type: String,
      required: true,
    },
  },
  favourite: {
    type: Boolean,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Task", taskSchema);
