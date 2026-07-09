const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config(); // making .env file available to the app
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});
const Fruit = require('./models/fruit.js');
app.use(express.urlencoded({ extended: false }));// Middleware to parse URL-encoded bodies

//HOME PAGE 
app.get('/', async (req, res) => {
  res.render('home.ejs');
});

// GET /fruits/new (form to create a new fruit)
app.get('/fruits/new', async (req, res) => {
  res.render('new.ejs');
});

//POST /fruits (create a new fruit in DB)
app.post('/fruits', async (req, res) => {
    //fruit object should match fruit model 
    const fruitData = {}
        fruitData.name= req.body.name
     if(req.body.isReadyToEat === 'on') {
        fruitData.isReadyToEat = true
     }else {
        fruitData.isReadyToEat = false
     }
     //use a  mongoose method to add it to the DB
     let createdFruit = await Fruit.create(fruitData);
     res.redirect('/');
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

//use a  mongoose method to find and update a fruit by its id=========================
    // let updateFruit= await Fruit.findByIdAndUpdate("6a4f6c54e95591c2d8f0d1ed",
    //     {name: 'pineapple'}, {new:true})