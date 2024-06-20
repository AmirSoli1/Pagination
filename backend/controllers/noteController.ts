const { StatusCodes } = require("http-status-codes");
import { Request, Response } from "express";

const Note = require("../models/Note");

const getAllNotes = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const notes = await Note.find({}).skip(skip).limit(limit);
  const total = await Note.countDocuments();
  const totalPages = Math.ceil(total / limit);

  res.status(StatusCodes.OK).json({ notes, totalPages, page });
};

const getNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = await Note.findOne({ id });
  if (!note) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error(`Note with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ note });
};

const createNote = async (req: Request, res: Response) => {
  const note = await Note.create(req.body);
  res.status(StatusCodes.CREATED).json({ note });
};

const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const note = await Note.findOneAndUpdate(
    { id },
    { content },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ note });
};

const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = await Note.findOneAndDelete({ id });

  if (!note) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error(`Note with id ${id} not found`);
  }

  res.status(StatusCodes.OK).send("Note deleted");
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
