import { useState } from "react";

import NoteInterface from "../utils/interfaces/NoteInterface";
import EditNote from "./EditNote";

export default function Note({
  note,
  handleDelete,
  handleEditNote,
  loggedName,
}: {
  note: NoteInterface;
  handleDelete: (id: number) => void;
  handleEditNote: (newNote: NoteInterface) => void;
  loggedName: string;
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
      {note.author && loggedName === note.author.name && (
        <>
          <button name={`edit-${note.id}`} onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button
            name={`delete-${note.id}`}
            onClick={() => handleDelete(note.id)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
