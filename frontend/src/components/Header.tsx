import AddNote from "./AddNote";
import Register from "./Register";
import Login from "./Login";

import { NoteInterfaceAuthorless } from "../utils/interfaces/NoteInterface";
import UserInterface from "../utils/interfaces/UserInterfaces";
import { UserLoginInterface } from "../utils/interfaces/UserInterfaces";

export default function Header({
  toggleTheme,
  isDarkMode,
  handleAddNote,
  handleRegister,
  handleLogin,
  handleLogout,
  token,
}: {
  toggleTheme: () => void;
  isDarkMode: boolean;
  handleAddNote: (newNote: NoteInterfaceAuthorless) => void;
  handleRegister: (newUser: UserInterface) => void;
  handleLogin: (user: UserLoginInterface) => void;
  handleLogout: () => void;
  token: string;
}) {
  return (
    <header>
      <h1>Notes App</h1>
      {token.length > 0 ? (
        <>
          <button name="logout" onClick={() => handleLogout()}>
            Logout
          </button>
          <AddNote handleAddNote={handleAddNote} />
        </>
      ) : (
        <>
          <Register handleRegister={handleRegister} />
          <Login handleLogin={handleLogin} />
        </>
      )}

      <button name="change_theme" onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </header>
  );
}
