const mongoose = require('mongoose');
const Message = require('../models/message');
const Quote = require('../models/quote');

mongoose.connect('mongodb://localhost:27017/messages', {
  useNewUrlParser: true,
});

const addMessage = (req, res) => {
  const message = new Message(req.body);
  message.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getMessages = (req, res) => {
  const { day, month, year } = req.query;
  Message.find({ day, month, year })
    .then((results) => {
      if (results.length !== 0) {
        res.status(200).send(results);
      } else {
        Quote.count().exec((err, count) => {
          const random = Math.floor(Math.random() * count);
          Quote.findOne().skip(random).exec((e, result) => {
            if (e) {
              res.status(500).send(e);
            } else {
              res.status(201).send(result);
            }
          });
        });
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const deleteMessage = (req, res) => {
  console.log(req.body);
  const { day, month, year } = req.body;
  Message.deleteMany({ day, month, year })
    .then((deleted) => {
      res.status(200).send(deleted);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { addMessage, getMessages, deleteMessage };
