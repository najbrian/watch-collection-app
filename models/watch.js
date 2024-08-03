const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const watchSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  dialsize: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  condition: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    required: true,
  },
  isForSale: {
    type: Boolean,
    required: true,
  },
  commentsByUsers: [commentSchema],
  favoritedByUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
})

const Watch = mongoose.model('Watch', watchSchema)

module.exports = Watch