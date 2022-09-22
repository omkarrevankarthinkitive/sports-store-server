const express = require("express");
const router = express.Router();

const userController=require("../controllers/user-controller")

//Get Request
router.get("/",userController.getUser);
//  Get Request for particular id
router.get("/:id",userController.getUserById);

//Post Request
router.post("/", userController.createUser);

// Put Request
router.put("/:id",userController.updateUser);

// delete request
router.delete("/:id", userController.deleteUser);

module.exports = router;
