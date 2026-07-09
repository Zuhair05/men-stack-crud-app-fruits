const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config(); // making .env file available to the app
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.get('/', async (req, res) => {
  res.render('home.ejs');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
