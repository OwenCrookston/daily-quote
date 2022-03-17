const router = require('express').Router();
const { addMessage, getMessages, deleteMessage } = require('./db');

// const requests = require('./api_requests.js');
// router.get('/loaderio-a9d2776d98baef71beb9fc6a53f2752c.txt', (req, res) => {
//   res.status(200).send('loaderio-a9d2776d98baef71beb9fc6a53f2752c');
// });
router.get('/messages/', getMessages);
router.post('/messages/', addMessage);
router.delete('/messages/', deleteMessage);

module.exports = router;
