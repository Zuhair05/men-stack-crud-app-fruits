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
const Fruit = require('./models/fruit.js');


app.get('/', async (req, res) => {
  res.render('home.ejs');
});

// this route will change often 
app.get('/fruits', async (req, res) => {
    //use a  mongoose method to find all mango 
    let notReady = await Fruit.find({
        isReadyToEat: false
    })
    //view the created fruit 
    res.send(notReady)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//code graveyard  ======================================================
//creat a fruit object 
// const fruitData = {}
// fruitData.isReadyToEat = false
//use a  mongoose method to add it to the DB 
// fruitData.name = 'mango'
// let createdFruit = await Fruit.create(fruitData)

//Find all fruits in the DB========================
//use a  mongoose method to add it to the DB 
// let allfruits = await Fruit.find()

// Find all fruit with name mango========================
// let allfruits = await Fruit.find({
//         name: 'mango'
//     })

//use a  mongoose method to find all fruit that are not ready to eat========================
    // let notReady = await Fruit.find({
    //     isReadyToEat: false
    // })