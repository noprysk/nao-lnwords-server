const express = require("express");
const groupRouter = express.Router();
const groupController = require("./../controllers/groupController");
const auth = require("./../middleware/auth");

groupRouter.get("", auth, groupController.getUserGroups);
groupRouter.post("", auth, groupController.saveUserGroup);

module.exports = groupRouter;