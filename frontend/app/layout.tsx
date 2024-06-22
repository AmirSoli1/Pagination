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
  const [isChange, setIsChange] = useState<boolean>(false); // to trigger re-fetching notes
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
        console.log(response);
        setNotes(response.data.notes);
        setLastPage(response.data.totalPages);
      })
      .catch((error) => {
        console.log("Encountered an error:" + error);
      });
  }, [currentPage, isChange]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  async function handleDelete(id: number) {
    await axios
      .delete(`${NOTES_URL}/${id}`)
      .then((response) => {
        if (!response.status) {
          throw new Error("Failed to delete note");
        }
        setIsChange(!isChange);
      })
      .catch((error) => {
        console.log("Encountered an error:" + error);
      });
  }

  async function handleAddNote(newNote: NoteInterface) {
    try {
      await axios.post(NOTES_URL, newNote);
      if (currentPage === lastPage) setIsChange(!isChange);
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  async function handleEditNote(newNote: NoteInterface) {
    try {
      await axios.put(`${NOTES_URL}/${newNote.id}`, {
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
