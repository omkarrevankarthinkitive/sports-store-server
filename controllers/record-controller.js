const mongoose = require("mongoose");
const { Record, validateRecord } = require("../models/record");

const getRecord = async (req, res) => {
  const record = await Record.find();
  res.send({ record });
};


const getRecordBySearch = async (req, res) => {
  const search = req.query.search;
  const record = await Record.find();
  const filterData = record.filter((record) =>
    record.firstName.toLowerCase().includes(search.toLowerCase())
  );
  return res.send({ msg: "Okk", data: filterData, status: 200 });
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
 const { error } = validateRecord(req.body);
if (error) return res.status(400).send(error.details[0].message);

  let record = new Record({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    passport: req.body.passport,
    birthDate: req.body.birthDate,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    accountNumber: req.body.accountNumber,
    description: req.body.description,
  });

  try {
    record = await record.save();
  } catch (err) {
    return res.status(400).send({ msg: err.message, status: 400 });
  }
  res.status(201).send({ msg: "Record is placed", data: record, status: 201 });
};

const updateRecord = async (req, res) => {
  const { error } = validateRecord(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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
    console.log("record", record.training);
    record.firstName = req.body.firstName
      ? req.body.firstName
      : record.firstName;

    (record.lastName = req.body.lastName ? req.body.lastName : record.lastName),
      (record.phone = req.body.phone ? req.body.phone : record.phone),
      (record.passport = req.body.passport
        ? req.body.passport
        : record.passport),
      (record.birthDate = req.body.birthDate
        ? req.body.birthDate
        : record.birthDate),
      (record.arrivalDate = req.body.arrivalDate
        ? req.body.arrivalDate
        : record.arrivalDate),
      (record.departureDate = req.body.departureDate
        ? req.body.departureDate
        : record.departureDate),
      (record.accountNumber = req.body.accountNumber
        ? req.body.accountNumber
        : record.accountNumber),
      (record.description = req.body.description
        ? req.body.description
        : record.description),
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
module.exports.getRecordBySearch=getRecordBySearch;
