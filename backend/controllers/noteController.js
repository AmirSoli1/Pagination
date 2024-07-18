const { StatusCodes } = require("http-status-codes");

const Note = require("../models/Note");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const getAllNotes = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const notes = await Note.find({}).skip(skip).limit(limit);
    const total = await Note.countDocuments();
    const totalPages = Math.ceil(total / limit);
    res.status(StatusCodes.OK).json({ notes, totalPages });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error fetching notes");
  }
};

const getNote = async (req, res) => {
  try {
    const { i } = req.params;
    const note = await Note.find({})
      .skip(i - 1)
      .limit(1);

    if (note.length === 0) {
      res.status(StatusCodes.NOT_FOUND).send("note not found");
      return;
    }
    res.status(StatusCodes.OK).json({ note });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error fetching note");
  }
};

const createNote = async (req, res) => {
  try {
    const { id, title, content } = req.body;
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }

    const note = await Note.create({
      id,
      title,
      content,
      author: {
        name: user.name,
        email: user.email,
      },
    });

    res.status(StatusCodes.CREATED).json({ note });
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error creating note");
  }
};

const updateNote = async (req, res) => {
  try {
    const { i } = req.params;
    const { content } = req.body;

    if (!content) {
      res.status(StatusCodes.BAD_REQUEST).send("content is required").end();
    }

    const note = await Note.find({})
      .skip(i - 1)
      .limit(1);

    if (note.length === 0) {
      res.status(StatusCodes.NOT_FOUND).send("note not found");
      return;
    }

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }

    if (user.name !== note[0].author.name.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: "forbidden" });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { id: note[0].id },
      { content },
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ updatedNote });
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error updating note");
  }
};

const deleteNote = async (req, res) => {
  try {
    const { i } = req.params;

    const note = await Note.find({})
      .skip(i - 1)
      .limit(1);

    if (note.length === 0) {
      res.status(StatusCodes.NOT_FOUND).send("note not found");
      return;
    }

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }

    if (user.name !== note[0].author.name.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: "forbidden" });
    }

    await Note.findOneAndDelete({ id: note[0].id });

    res.status(StatusCodes.NO_CONTENT).send("Note deleted");
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error deleting note");
  }
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
