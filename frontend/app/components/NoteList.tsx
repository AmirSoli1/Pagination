import NoteInterface from "../interfaces/NoteInterface";
import Note from "./Note";

export default function NoteList({
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
