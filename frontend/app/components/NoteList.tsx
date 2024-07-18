import NoteInterface from "../interfaces/NoteInterface";
import Note from "./Note";

export default function NoteList({
  notes,
  handleDelete,
  handleEditNote,
  loggedName,
}: {
  notes: NoteInterface[];
  handleDelete: (id: number) => void;
  handleEditNote: (newNote: NoteInterface) => void;
  loggedName: string;
}) {
  return (
    <ul className="note-list">
      {notes.map((note: NoteInterface) => (
        <Note
          note={note}
          key={note.id}
          handleDelete={handleDelete}
          handleEditNote={handleEditNote}
          loggedName={loggedName}
        />
      ))}
    </ul>
  );
}
