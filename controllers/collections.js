const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Watch = require('../models/watch.js');

router.get('/', async (req, res) => {
  const otherUsers = await User.find({ _id: { $ne: req.session.user._id } })

  res.render('collections/index.ejs', { otherUsers })
})

router.get('/:userId', async (req, res) => {
  const userCollection = await Watch.find({ owner: req.params.userId }).populate('owner')
  const userDetails = await User.findById(req.params.userId)
  res.render('collections/other-users.ejs', { userCollection, userDetails })
})

router.get('/:userId/:watchId', async (req, res) => {
  const userWatch = await Watch.findById(req.params.watchId).populate('owner')
res.render('collections/show.ejs', {userWatch})
})

module.exports = router