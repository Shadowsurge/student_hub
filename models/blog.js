let mongoose = require('mongoose'),
    User = require('./user.js');

let blogSchema = new mongoose.Schema({
  title: String,
  submittedBy:
  {
    type: String,
    default: "Anonymous"
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
