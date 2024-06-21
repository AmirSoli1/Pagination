"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";

const POSTS_PER_PAGE = 10;
const NOTES_URL = "http://localhost:3001/api/v1/notes";

interface Author {
  name: string;
  email: string;
}

interface NoteInterface {
  id: number;
  title: string;
  author: Author;
  content: string;
}

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
      await axios.put(`${NOTES_URL}/${newNote.id}`, newNote);
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

function Header({
  toggleTheme,
  isDarkMode,
  handleAddNote,
}: {
  toggleTheme: () => void;
  isDarkMode: boolean;
  handleAddNote: (newNote: NoteInterface) => void;
}) {
  return (
    <header>
      <h1>Notes App</h1>
      <AddNote handleAddNote={handleAddNote} />
      <button name="change_theme" onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </header>
  );
}

function AddNote({
  handleAddNote,
}: {
  handleAddNote: (newNote: NoteInterface) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [authorEmail, setAuthorEmail] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newNote = {
      id: Math.floor(Math.random() * 1000000),
      title,
      author: {
        name: authorName,
        email: authorEmail,
      },
      content,
    };
    await handleAddNote(newNote);
    setTitle("");
    setContent("");
    setAuthorName("");
    setAuthorEmail("");
  }
  if (isAdding) {
    return (
      <form className="add-new-note" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Content:</label>
        <input
          type="text"
          className="content-input"
          name="text_input_new_note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label>Author Name:</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />

        <label>Author Email:</label>
        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          required
        />

        <button type="submit" name="text_input_save_new_note">
          Add Note
        </button>
        <button
          name="text_input_cancel_new_note"
          onClick={() => {
            setIsAdding(false);
            setAuthorEmail("");
            setAuthorName("");
            setContent("");
            setTitle("");
          }}
        >
          Cancel
        </button>
      </form>
    );
  } else {
    return (
      <button name="add_new_note" onClick={() => setIsAdding(true)}>
        Add Note
      </button>
    );
  }
}

function NoteList({
  notes,
  handleDelete,
  handleEditNote,
}: {
  notes: NoteInterface[];
  handleDelete: (id: number) => void;
  handleEditNote: (newNote: NoteInterface) => void;
}) {
  return (
    <ul className="note-list">
      {notes.map((note: NoteInterface) => (
        <Note
          note={note}
          key={note.id}
          handleDelete={handleDelete}
          handleEditNote={handleEditNote}
        />
      ))}
    </ul>
  );
}

function Note({
  note,
  handleDelete,
  handleEditNote,
}: {
  note: NoteInterface;
  handleDelete: (id: number) => void;
  handleEditNote: (newNote: NoteInterface) => void;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [noteContent, setNoteContent] = useState<string>(note.content);

  return (
    <li className="note" id={note.id.toString()}>
      <h2>{note.title}</h2>

      {isEditing ? (
        <EditNote
          note={note}
          setNoteContent={setNoteContent}
          setIsEditing={setIsEditing}
          handleEditNote={handleEditNote}
        />
      ) : (
        <p>{noteContent}</p>
      )}

      <p>
        {note.author ? "By " + note.author.name + ", " + note.author.email : ""}
      </p>

      <button name={`edit-${note.id}`} onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button name={`delete-${note.id}`} onClick={() => handleDelete(note.id)}>
        Delete
      </button>
    </li>
  );
}

function EditNote({
  note,
  setIsEditing,
  handleEditNote,
  setNoteContent,
}: {
  note: NoteInterface;
  setIsEditing: (isEditing: boolean) => void;
  handleEditNote: (newNote: NoteInterface) => void;
  setNoteContent: (content: string) => void;
}) {
  const [newContent, setNewContent] = useState<string>(note.content);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleEditNote({ ...note, content: newContent });
    setNoteContent(newContent);
    setIsEditing(false);
  }

  return (
    <form className="edit-note" onSubmit={handleSubmit}>
      <label>Content:</label>
      <input
        type="text"
        name={`text_input-${note.id}`}
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        required
      />

      <button type="submit" name={`text_input_save-${note.id}`}>
        Save
      </button>
      <button
        name={`text_input_cancel-${note.id}`}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </form>
  );
}

function Pagination({
  currentPage,
  onPageChange,
  lastPage,
}: {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  lastPage: number;
}) {
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
    <div className="pagination">
      <button onClick={() => onPageChange(1)} name="first">
        First
      </button>

      <button
        onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
        name="previous"
      >
        Previous
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "current-page" : ""}
          onClick={() => onPageChange(pageNumber)}
          name={`page-${pageNumber}`}
          key={pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() =>
          onPageChange(currentPage < lastPage ? currentPage + 1 : lastPage)
        }
        name="next"
        disabled={currentPage === lastPage}
      >
        Next
      </button>
      <button onClick={() => onPageChange(lastPage)} name="last">
        Last
      </button>
    </div>
  );
}
