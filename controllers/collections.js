const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Watch = require('../models/watch.js');

router.get('/', async (req, res) => {
  const otherUsers = await User.find({ _id: { $ne: req.session.user._id } })

  res.render('collections/index.ejs', { otherUsers })
})

router.get('/:ownerId', async (req, res) => {
  const userCollection = await Watch.find({ owner: req.params.ownerId }).populate('owner')
  const userDetails = await User.findById(req.params.ownerId)
  res.render('collections/other-users.ejs', { userCollection, userDetails })
})

router.get('/:ownerId/:watchId', async (req, res) => {
  try {
  const userWatch = await Watch.findById(req.params.watchId).populate('owner')
  const userHasFavorited = userWatch.favoritedByUsers.some((user) => user.equals(req.session.user._id))
  const comments = userWatch.commentsByUsers.find(req.params.watchId)
  res.render('collections/show.ejs', { userWatch, userHasFavorited, comments })
  }catch(error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/:ownerId/:watchId/comments', async (req,res) => {
  try{
    req.body.owner = req.session.user._id
    const currentWatch = await Watch.findById(req.params.watchId)
    currentWatch.commentsByUsers.push(req.body)
  
    await currentWatch.save()
    res.render('collections/show.ejs', {currentWatch})

  } catch(error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/:ownerId/:watchId/favorited-by/:userId', async (req, res) => {
  try {
    await Watch.findByIdAndUpdate(req.params.watchId, {
      $push: { favoritedByUsers: req.params.userId },
    })
    res.redirect(`/collections/${req.params.ownerId}/${req.params.watchId}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:ownerId/:watchId/favorited-by/:userId', async (req, res) => {
  try {
    await Watch.findByIdAndUpdate(req.params.watchId, {
      $pull: { favoritedByUsers: req.params.userId },
    })
    res.redirect(`/collections/${req.params.ownerId}/${req.params.watchId}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router