const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Id is required"],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
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

// const mongoose = require("mongoose");

// const authorSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//   },
//   { _id: false }
// );

// const NoteSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: [true, "Id is required"],
//     unique: true,
//   },
//   title: {
//     type: String,
//     required: [true, "Title is required"],
//   },
//   author: {
//     type: authorSchema,
//     default: null,
//   },
//   content: {
//     type: String,
//     required: [true, "Content is required"],
//   },
// });

// const Note = mongoose.model("Note", NoteSchema);

// module.exports = Note;
