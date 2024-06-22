import { useState } from "react";

import NoteInterface from "../interfaces/NoteInterface";
import EditNote from "./EditNote";

export default function Note({
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
          setIsEditing={setIsEditing}
          handleEditNote={handleEditNote}
          setNoteContent={setNoteContent}
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
