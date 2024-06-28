"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import NoteList from "./components/NoteList";
import Pagination from "./components/Pagination";

import NoteInterface from "./interfaces/NoteInterface";

import "./index.css";

const NOTES_URL = "http://localhost:3001/notes";

export default function RootLayout() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const promise = axios.get(NOTES_URL, {
      params: {
        page: currentPage,
      },
    });
    promise
      .then((response) => {
        if (!response.status) {
          throw new Error("Failed to fetch notes");
        }
        setNotes(response.data.notes);
        setLastPage(response.data.totalPages);
      })
      .catch((error) => {
        console.log("Encountered an error:" + error);
      });
  }, [currentPage, triggerFetch]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  async function handleDelete(id: number) {
    try {
      const noteIndex =
        (currentPage - 1) * 10 + notes.findIndex((note) => note.id === id) + 1;
      console.log(noteIndex);
      await axios.delete(`${NOTES_URL}/${noteIndex}`);
      setTriggerFetch(!triggerFetch);
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  async function handleAddNote(newNote: NoteInterface) {
    try {
      await axios.post(NOTES_URL, newNote);
      setTriggerFetch(!triggerFetch);
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  async function handleEditNote(newNote: NoteInterface) {
    try {
      const noteIndex =
        (currentPage - 1) * 10 +
        notes.findIndex((note) => note.id === newNote.id) +
        1;
      await axios.put(`${NOTES_URL}/${noteIndex}`, {
        content: newNote.content,
      });
      setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)));
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  return (
    <html lang="en">
      <body className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          handleAddNote={handleAddNote}
        />
        <NoteList
          notes={notes}
          handleDelete={handleDelete}
          handleEditNote={handleEditNote}
        />
        <Pagination
          currentPage={currentPage}
          onPageChange={goToPage}
          lastPage={lastPage}
        />
      </body>
    </html>
  );
}
