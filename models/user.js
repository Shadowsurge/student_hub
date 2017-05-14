let mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  username:
  {
    type: String,
    required: true,
    trim: true
  },
  password:
  {
    type: String,
    minLength: 8,
    maxLength: 16
  },
  isAdmin:
  {
    type: Boolean,
    default: false
  },
  adverts:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advert"
    }
  ],
  blogs:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
