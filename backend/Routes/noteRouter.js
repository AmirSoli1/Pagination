const express = require("express");

const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);
router.route("/:i").get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;
