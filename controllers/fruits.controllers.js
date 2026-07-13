const Fruit = require('../models/fruit.js');

const index = async (req, res) => {
    let allfruits = await Fruit.find()
   res.render('index.ejs', {
      allfruits: allfruits 
    });
}

const show =async (req, res) => {
    let foundFruit = await Fruit.findById(req.params.id)
    res.render('show.ejs', {
        foundFruit: foundFruit
    });
}

const showNewForm = async (req, res) => {
  res.render('new.ejs');
}

const create = async (req, res) => {
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
     res.redirect('/fruits');
}

const edit = async (req, res) => {
    let foundFruit = await Fruit.findById(req.params.id)
    res.render('edit.ejs', {
        foundFruit: foundFruit
    });
}

const update = async (req, res) => {
    let updatedFruitData = await Fruit.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isReadyToEat: req.body.isReadyToEat === 'on' ? true : false
    }, { new: true });
    res.redirect('/fruits');
}

const deleteFruit  = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.id)
    res.redirect('/fruits');
}



module.exports = {
    index,
    show,
    showNewForm,
    create,
    edit,
    update,
    deleteFruit
}