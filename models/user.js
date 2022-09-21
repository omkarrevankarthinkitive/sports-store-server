const Joi = require("joi");
const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
    },
    mobile_no: {
      type: Number,
      required: true,
    },
    address_info: [
      {
        address1: String,
        address2: String,
        city: String,
        pincode: Number,
        primary: Boolean,
      },
    ],
  })
);
function validateUser(user) {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
    mobile_no: Joi.number().required(),
    address1: Joi.string().min(2).max(50).required(),
    address2: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(50).required(),
    pincode: Joi.number().required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
