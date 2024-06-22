import AddNote from "./AddNote";

import NoteInterface from "../interfaces/NoteInterface";

export default function Header({
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
