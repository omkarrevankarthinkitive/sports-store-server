const mongoose = require("mongoose");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(user);
};

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("req.body", req.body);

  const hashPassowrd = await bcrypt.hash(req.body.password, 10);
  let user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: hashPassowrd,
    email: req.body.email,
    mobile_no: req.body.mobile_no,
    address_info: [
      {
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        pincode: req.body.pincode,
        primary: req.body.primary,
      },
    ],
  });
  try {
    user = await user.save();
  } catch (err) {
    return res.status(400).send(err.message);
  }
  res.status(201).send(user);
};


const updateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      address: req.body.address,
      dob: req.body.dob,
    });
    if (!user)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(user);
  } catch (err) {
    res.status(400).send("err.message");
  }
};

const deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const user = await User.findByIdAndRemove(req.params.id);
  if (!User)
    return res
      .status(204)
      .send("The customer with the given ID was not found.");

  res.send("User deleted");
};

module.exports.getUser = getUser;
module.exports.getUserById = getUserById;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
