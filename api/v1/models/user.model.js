const mongoose = require('mongoose');
const uuid = require('uuid');
const { Constants } = require('../../../config/constant');
let schema = mongoose.Schema(
  {
    _id: {
      type: String,
      auto: true,
      default: () => uuid.v4(),
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      index: true,
      trim: true,
    },
    phone: {
      type: Number,
      index: true,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true },
);

schema.path('email').validate((val) => {
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');


schema.path('phone').validate((val) => {
  let phoneRegex =
    /^\d{10}$/
    ;
  return phoneRegex.test(val);
}, 'Invalid phone, it should be 10 digit number');

schema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  if (object?.image && object?.image != '') {
    object.image = `${Constants.filePublicBaseUrl}${object.image}`;
  }
  return object;
});

module.exports = mongoose.model("User", schema);
