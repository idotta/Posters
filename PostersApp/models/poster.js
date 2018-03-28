const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = mongoose.Schema.Types

const posterSchema = new Schema({
  phone: { type: String, required: true },
  username: String,
  firstname: String,
  lastname: String,
  posts: [{
    title: String,
    body: String,
    timestamp: { type: Date, default: Date.now, required: true }
  }],
  subscriptions: [{ type: Types.ObjectId, ref: 'Poster' }],
  timestamp: { type: Date, default: Date.now, required: true }
})

const Poster = mongoose.model('Poster', posterSchema)

module.exports = Poster
