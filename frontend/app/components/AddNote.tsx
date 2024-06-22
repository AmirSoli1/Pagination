import { useState } from "react";

import NoteInterface from "../interfaces/NoteInterface";

export default function AddNote({
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
      id: Math.floor(Math.random() * 100000000),
      title,
      author: {
        name: authorName,
        email: authorEmail,
      },
      content,
    };
    await handleAddNote(newNote);
    setIsAdding(false);
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
