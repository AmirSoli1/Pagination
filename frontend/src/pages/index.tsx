"use client";

import { useState, useEffect, useRef, use } from "react";
import axios from "axios";

import Header from "../components/Header";
import NoteList from "../components/NoteList";
import Pagination from "../components/Pagination";

import NoteInterface from "../utils//interfaces/NoteInterface";
import { NoteInterfaceAuthorless } from "../utils//interfaces/NoteInterface";
import UserInterface from "../utils/interfaces/UserInterfaces";
import { UserLoginInterface } from "../utils//interfaces/UserInterfaces";

import "../css/index.css";
import { get } from "http";

const NOTES_URL = "http://localhost:3001";

export async function getStaticProps() {
  const response = await axios.get(`${NOTES_URL}/notes`, {
    params: {
      page: 1,
    },
  });
  if (!response.status) {
    throw new Error("Failed to fetch notes");
  }
  const data = response.data;

  return {
    props: {
      data,
    },
  };
}

export default function App({ data }: { data: any }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [notes, setNotes] = useState<NoteInterface[]>(data.notes);
  const [lastPage, setLastPage] = useState<number>(data.lastPage);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [loggedName, setLoggedName] = useState<string>("");
  const cache = useRef<{ [key: number]: NoteInterface[] }>({});

  useEffect(() => {
    cache.current = { 1: data.notes };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setPage = async (pageNumber: number) => {
    await updateCache();
    if (cache.current[pageNumber]) {
      setNotes(cache.current[pageNumber]);
      return;
    }
    fetchPage(pageNumber);
  };

  const fetchPage = async (pageNumber: number) => {
    try {
      const response = await axios.get(`${NOTES_URL}/notes`, {
        params: {
          page: pageNumber,
        },
      });

      if (!response.status) {
        throw new Error("Failed to fetch notes");
      }
      cache.current[pageNumber] = response.data.notes;
      setLastPage(response.data.totalPages);
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage, triggerFetch]);

  const updateCache = async () => {
    const pageNumbers = getPageNumbers();
    for (const pageNumber of pageNumbers) {
      if (!cache.current[pageNumber]) {
        await fetchPage(pageNumber);
      }
    }
    const cachePages = Object.keys(cache.current).map(Number);
    for (const cachePage of cachePages) {
      if (!pageNumbers.includes(cachePage)) {
        delete cache.current[cachePage];
      }
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  async function handleDelete(id: number) {
    try {
      const noteIndex =
        (currentPage - 1) * 10 + notes.findIndex((note) => note.id === id) + 1;
      await axios.delete(`${NOTES_URL}/notes/${noteIndex}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTriggerFetch(!triggerFetch);
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  async function handleAddNote(newNote: NoteInterfaceAuthorless) {
    try {
      await axios.post(`${NOTES_URL}/notes`, newNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      await axios.put(
        `${NOTES_URL}/notes/${noteIndex}`,
        {
          content: newNote.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)));
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  async function handleRegister(newUser: UserInterface) {
    try {
      await axios.post(`${NOTES_URL}/users`, newUser);
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  async function handleLogin(user: UserLoginInterface) {
    try {
      const response = await axios.post(`${NOTES_URL}/login`, user);
      setToken(response.data.token);
      setLoggedName(response.data.name);
    } catch (error) {
      console.log("Encountered an error:" + error);
    }
  }

  function handleLogout() {
    setToken("");
    setLoggedName("");
  }

  const getPageNumbers = () => {
    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    } else if (currentPage < 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= 3 && currentPage <= lastPage - 2) {
      return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    } else {
      return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        handleAddNote={handleAddNote}
        handleRegister={handleRegister}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        token={token}
      />
      <NoteList
        notes={notes}
        handleDelete={handleDelete}
        handleEditNote={handleEditNote}
        loggedName={loggedName}
      />
      <Pagination
        currentPage={currentPage}
        onPageChange={goToPage}
        lastPage={lastPage}
        getPageNumbers={getPageNumbers}
      />
    </div>
  );
}
