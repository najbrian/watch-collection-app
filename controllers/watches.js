const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Watch = require('../models/watch.js');

router.get('/', (req, res) => {
  res.render('watches/index.ejs')
})

module.exports = router