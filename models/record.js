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
  })
);

function validateRecord() {
  const schema = Joi.object().keys({ 
    player_name: Joi.string().min(2).max(50),
    age: Joi.number(),
    weight: Joi.number(),
    height: Joi.number(),
  });
  return schema.validate(Record);
}

module.exports.Record = Record;
module.exports.validateRecord = validateRecord;
