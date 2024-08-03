const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Watch = require('../models/watch.js');

///users/:userId/watches

router.get('/', async (req, res) => {
  try {
    const populatedWatches = await Watch.find({owner: req.session.user}).populate('owner')
    res.render('watches/index.ejs', { watches: populatedWatches })
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

router.get('/:watchId/edit', async (req, res) => {
  try {
    const editWatch = await Watch.findById(req.params.watchId).populate('owner')
    res.render('watches/edit.ejs', {watch: editWatch})
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

router.put('/:watchId', async (req, res) => {
try {
  req.body.owner = req.session.user._id
  if(req.body.isForSale === 'on') {
    req.body.isForSale = true
  } else {
    req.body.isForSale = false
  }
  await Watch.findByIdAndUpdate(req.params.watchId, req.body)
  res.redirect(`/users/${req.session.user._id}/watches/${req.params.watchId}`)

}catch (error) {
  console.log(error)
  res.redirect('/')
}
})


module.exports = router