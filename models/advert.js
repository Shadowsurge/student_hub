let mongoose = require('mongoose'),
    User = require('./user.js');

let advertSchema = new mongoose.Schema({
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
  school: String,
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
  },
  createdAt: Date
});

advertSchema.pre('remove', function(next)
{
  User.update(
    {adverts: this},
    {$pull: {adverts: this._id}},
    {multi: true}
  ).exec(next);
});

module.exports = mongoose.model('Advert', advertSchema);
