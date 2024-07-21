const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Id is required"],
  },
  title: {
    type: String,
  },
  author:
    {
      name: {
        type: String,
        required: [true, "Author name is required"],
      },
      email: {
        type: String,
        required: [true, "Author email is required"],
      },
    } || null,
  content: {
    type: String,
    required: [true, "Content is required"],
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
