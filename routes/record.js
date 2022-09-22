const express = require("express");
const recordController = require("../controllers/record-controller");
const router = express.Router();
const auth_middleware = require("../middleware/auth");

router.use(auth_middleware);

//Get Request
router.get("/", recordController.getRecord);

// Get Request
router.get("/search", recordController.getRecordBySearch);

//  Get Request for particular id
router.get("/:id", recordController.getRecordByUserId);

//Post Request
router.post("/", recordController.createRecord);

// Put Request
router.put("/:id", recordController.updateRecord);

// delete request
router.delete("/:id", recordController.deleteRecord);

module.exports = router;