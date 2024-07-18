const express = require("express");

const { getUser, createUser } = require("../controllers/userController");

const router = express.Router();

router.route("/").post(createUser);
router.route("/:username").get(getUser);

module.exports = router;
