const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const clubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number
  }
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  clubRank: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
  }]
});


module.exports = {
  Club: mongoose.model('Club', clubSchema),
  User: mongoose.model('User', userSchema)
};
