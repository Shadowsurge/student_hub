let mongoose = require('mongoose'),
    User = require('./models/user.js');

let blogSchema = new mongoose.Schema({
  title: String,
  author:
  {
    id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  content: String,
  approved:
  {
    type: Boolean,
    default: false
  },
  approvedBy:
  {
    id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model('Blog', blogSchema);
