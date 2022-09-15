module.exports = function (req, res, next) {
  if (!req.user.is_Admin)
    return res
      .status(403)
      .send({ msg: "Access denied,you are not admin", status: 403 });
  next();
};
