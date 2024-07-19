import NoteInterface from "../utils/interfaces/NoteInterface";

import { useState } from "react";

export default function EditNote({
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
