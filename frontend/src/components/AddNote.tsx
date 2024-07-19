import { useState } from "react";

import { NoteInterfaceAuthorless } from "../utils/interfaces/NoteInterface";

export default function AddNote({
  handleAddNote,
}: {
  handleAddNote: (newNote: NoteInterfaceAuthorless) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newNote = {
      id: Math.floor(Math.random() * 100000000),
      title,
      content,
    };
    await handleAddNote(newNote);
    setIsAdding(false);
    setTitle("");
    setContent("");
  }
  if (isAdding) {
    return (
      <form className="add-new-note" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        <button type="submit" name="text_input_save_new_note">
          Add Note
        </button>
        <button
          name="text_input_cancel_new_note"
          onClick={() => {
            setIsAdding(false);
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
