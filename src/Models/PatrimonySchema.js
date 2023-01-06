const mongoose = require('mongoose');

const patrimonySchema = new mongoose.Schema({
  image: {
    type: String,
    require: false,
  },
  name: {
    type: String,
    require: [true],
  },
  description: {
    type: String,
    require: [true],
  },
  createdAt: {
    type: Date,
    require: [true],
  }
});

module.exports = mongoose.model('Patrimony', patrimonySchema);