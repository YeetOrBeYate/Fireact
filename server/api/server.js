const express = require('express');
require('dotenv').config()
//added cors
const cors = require('cors');

const app = express();
const routes = require('./controllers/messages.js')


app.use(express.json());
app.use(cors());
app.post('/token', routes.addToken)
app.get('/messages', routes.messagesPage)
app.post('/messages', routes.addMessage)
app.use('/', (req, res) => {
  res.status(200).json({message:'welcome brotherly brother'})
})


module.exports = app;
