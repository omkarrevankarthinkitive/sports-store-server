const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_PRIVATE_KEY } = require("../config/index");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token)
    return res
      .status(401)
      .send({ msg: "Access denied. No token ", status: 401 });
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ msg: "Invalid token.", status: 400 });
  }
};
