const mongoose = require("mongoose");
const { Record, validateRecord } = require("../models/record");
const { User } = require("../models/user");

const getRecord = async (req, res) => {
  const record = await Record.find();
  res.send({ record });

};

const getRecordByUserId = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ msg: "User Id is not valid", status: 400 });
  const record = await Record.find();

  const filterRecord = record.filter((record) => {
    return record._id.toString() === req.params.id;
  });
  res.status(200).send({ filterRecord });
};

const createRecord = async (req, res) => {
  let record = new Record({
    player_name: req.body.player_name,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
  });
  console.log("record:", record);
  try {
    record = await record.save();
  } catch (err) {
    return res.status(400).send({ msg: err.message, status: 400 });
  }
  res.status(201).send({ msg: "Record is placed", data: record, status: 201 });
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record)
      return res
        .status(404)
        .send({ msg: "Record is not created", status: 404 });
    if (req.user_id != "undefined") {
      const record = await Record.findById(req.params.id);
    
      if (!record)
        return res.status(400).send({
          msg: "User of this record is not registered !",
          status: 400,
        });
    }
    record.player_name = req.body.player_name
      ? req.body.player_name
      : record.player_name;
 
    (record.age = req.body.age ? req.body.age : record.age),
      (record.weight = req.body.weight ? req.body.weight : record.weight),
      (record.height = req.body.height ? req.body.height : record.height),
      console.log("record",record)
      record.save();
    res.send({ msg: "Record is updated", data: record, status: 200 });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err, status: 400 });
  }
};

const deleteRecord = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const order = await Record.findByIdAndRemove(req.params.id);
  if (!order) return res.status(204).send("Order is not deleted");
  res.send("Order deleted");
};

module.exports.getRecord = getRecord;
module.exports.getRecordByUserId = getRecordByUserId;
module.exports.createRecord = createRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;
