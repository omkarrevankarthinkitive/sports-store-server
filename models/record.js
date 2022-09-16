const { boolean, string } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const Record = mongoose.model(
  "Record",
  new mongoose.Schema({
    player_name: {
      type: String,
      minlength: 5,
      maxlength: 50,
    },
    age: {
      type: String,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    training: [
      {
        sports: String,
        training_days_per_month: Number,
        training_days_per_week: Number,
        training_hrs_per_day: Number,
      },
    ],
  })
);

function validateRecord() {
  const schema = Joi.object().keys({
    player_name: Joi.string().min(5).max(30),
    age: Joi.number(),
    weight: Joi.number(),
    height: Joi.number(),
    sports:Joi.string().min(5).max(30),
    training_days_per_month: Joi.number(),
    training_days_per_week: Joi.number(),
    training_hrs_per_day: Joi.number(),
  });
  return schema.validate(Record);
}

module.exports.Record = Record;
module.exports.validateRecord = validateRecord;
