const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { DB, PORT, ADMIN_PASSWORD } = require("./config/index.js");
const record_routes =require("./routes/record");
const auth_routes = require("./routes/auth");
const user_routes = require("./routes/users");
const { User } = require("./models/user");
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/record", record_routes);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.listen(PORT, async () => {
  let user = await User.findOne({ email: "admin123@thinkitive.com" });
  if (!user) {
    const hashPassowrd = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const newUser = new User({
      first_name: "Aditya",
      last_name: "Gupta",
      email: "admin123@thinkitive.com",
      password: hashPassowrd,
      address: "Mumbai",
      mobile_no: "7300570080",
    });
    await newUser.save();
  }
  console.log(`Listening to the port - ${PORT} `);
});
