const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Watch = require('../models/watch.js');

///users/:userId/watches

router.get('/', async (req, res) => {
  try {
    const populatedWatches = await Watch.find({}).populate('owner')
    currentUser = req.session.user
    res.render('watches/index.ejs', { watches: populatedWatches, currentUser })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/new', (req, res) => {
  res.render('watches/new.ejs')
})

router.get('/:watchId', async (req, res) => {
  try {
    const watchData = await Watch.findById(req.params.watchId)
    res.render('watches/show.ejs', { watch: watchData })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/', async (req, res) => {
  try {
    req.body.owner = req.session.user._id
    if (req.body.isForSale === "on") {
      req.body.isForSale = true;
    } else {
      req.body.isForSale = false;
    }
    await Watch.create(req.body)
    res.redirect('/users/:userId/watches')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }

})

module.exports = router