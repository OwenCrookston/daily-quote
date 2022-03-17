const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  by: { type: String, required: true },
  tags: { type: Array, required: true },
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
