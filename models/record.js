const { boolean, string, number } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const Record = mongoose.model(
  "Record",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    phone: {
      type: Number,
    },
    passport: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    arrivalDate: {
      type: Date,
    },
    departureDate: {
      type: Date,
    },
    accountNumber: {
      type: Date,
    },
    description: {
      type: String,
      minlength: 0,
      maxlength: 1000,
    },
  })
);

function validateRecord(user) {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    phone: Joi.number(),
    passport: Joi.string(),
    birthDate: Joi.date(),
    arrivalDate: Joi.date(),
    departureDate: Joi.date(),
    accountNumber: Joi.number(),
    description:  Joi.string().min(0).max(1000)
  });
  return schema.validate(user);
}

module.exports.Record = Record;
module.exports.validateRecord = validateRecord;
