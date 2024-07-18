import { useState } from "react";

import UserInterface from "../interfaces/UserInterfaces";

export default function Register({
  handleRegister,
}: {
  handleRegister: (newUser: UserInterface) => void;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      username: username,
      password: password,
    };
    await handleRegister(newUser);
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
  }

  return (
    <form name="create_user_form" onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        name="create_user_form_name"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Email:</label>
      <input
        type="text"
        value={email}
        name="create_user_form_email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Username:</label>
      <input
        type="text"
        value={username}
        name="create_user_form_username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        name="create_user_form_password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" name="create_user_form_create_user">
        Create User
      </button>
    </form>
  );
}
