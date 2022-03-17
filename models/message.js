const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  from: { type: String, required: true },
  day: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
