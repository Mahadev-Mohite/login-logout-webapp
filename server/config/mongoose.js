const mongoose = require('mongoose')

const mongoDB = mongoose.connect('mongodb://127.0.0.1:27017/urlshortner')

module.exports = mongoDB