const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Quote = require('../models/quote');

// localhost connection
mongoose.connect('mongodb://localhost:27017/messages', {
  useNewUrlParser: true,
});

const batch = [];
fs.createReadStream('../quotes.csv')
  .pipe(csv())
  .on('data', (data) => {
    const attribution = data.Author === '' ? 'unattributed' : data.Author;
    const categories = ['famous'];
    batch.push(new Quote({ quote: data.Quote, by: attribution, tags: categories }));
  })
  .on('end', () => {
    Quote.insertMany(batch);
    console.log('done');
  });

// author quote
