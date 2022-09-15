const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  User,
  validateUser,
  validateAddress,
  validateUserUpdate,
  validatePassword,
} = require("../models/user");

const getUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const changePassword = async (req, res) => {
  try {
    const { error } = validatePassword(req.body);
    if (error)
      return res
        .status(400)
        .send({ msg: error.details[0].message, status: 400, data: "Hello" });
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(404)
        .send({ msg: "This User is not  registered.", data: "", status: 404 });
    const validPassword = await bcrypt.compare(
      req.body.oldpassword,
      user.password
    );
    if (!validPassword)
      return res
        .status(400)
        .send({ msg: "Current password is not valid", data: "", status: 400 });
    const salt = await bcrypt.genSalt(10);
    if (req.body.oldpassword === req.body.newpassword)
      return res.status(400).send({
        msg: "New password can't be same from previous password",
        status: 400,
      });
    const newpassword = await bcrypt.hash(req.body.newpassword, salt);
    user.password = newpassword;
    await user.save();
    res.status(200).send({ msg: "Password is changed", status: 200 });
  } catch (err) {
    res.send({ msg: err, status: 400 });
  }
};

const getUserById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ msg: "User Id is not valid", status: 400, data: "" });
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send({
      msg: "The customer with the given ID was not found.",
      status: 404,
      user: "",
    });
  res.send({ msg: "Get User", status: 200, data: user });
};

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .send({ msg: error.details[0].message, status: 400, data: "" });
  let user = await User.findOne({ email: req.body.email });

  if (user)
    return res
      .status(400)
      .send({ msg: "This Email already registered.", data: "", status: 400 });
  const address_info = {
    address1: req.body.address1,
    address2: req.body.address2,
    landmark: req.body.landmark,
    city: req.body.city,
    pincode: req.body.pincode,
    primary: true,
  };
  user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    user_image: req.file.path,
    mobile_no: req.body.mobile_no,
    address_info: [address_info],
    dob: req.body.dob,
  });
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
  } catch (err) {
    return res.status(400).send({ msg: err.message, status: 400, data: "" });
  }
  res.status(201).send({ msg: "User Created", status: 201, data: user });
};

const updateAddress = async (req, res) => {
  const { error } = validateAddress(req.body);
  if (error)
    return res
      .status(400)
      .send({ msg: error.details[0].message, status: 400, data: "" });
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ msg: "This User is not registered.", data: "", status: 400 });
  const address = {
    address1: req.body.address1,
    address2: req.body.address2,
    landmark: req.body.landmark,
    city: req.body.city,
    pincode: req.body.pincode,
    primary: false,
  };
  user.address_info = [...user.address_info, address];
  try {
    user = await user.save();
  } catch (err) {
    return res.status(400).send({ msg: err.message, status: 400, data: "" });
  }
  res.status(200).send({ msg: "Address Added", status: 200, data: user });
};

const updateUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ msg: "User Id is not valid", status: 400 });
  let password;
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send({
        msg: "The customer with the given ID was not found.",
        status: 404,
      });
    user.first_name = req.body.first_name
      ? req.body.first_name
      : user.first_name;
    (user.last_name = req.body.last_name ? req.body.last_name : user.last_name),
      (user.email = req.body.email ? req.body.email : user.email),
      (user.password = user.password),
      (user.mobile_no = req.body.mobile_no
        ? req.body.mobile_no
        : user.mobile_no),
      (user.address_info = req.body.address_info
        ? req.body.address_info
        : user.address_info),
      (user.user_image = req.file?.path ? req.file?.path : user.user_image),
      (user.dob = req.body.dob ? req.body.dob : user.dob),
      user.save();
    res.send({ msg: "Profile Updated ", data: user, status: 200 });
  } catch (err) {
    res.status(400).send({ msg: err, status: 400 });
  }
};

const deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res
      .status(204)
      .send("The customer with the given ID was not found.");

  res.send("User deleted");
};

module.exports.getUser = getUser;
module.exports.getUserById = getUserById;
module.exports.changePassword = changePassword;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.updateAddress = updateAddress;
