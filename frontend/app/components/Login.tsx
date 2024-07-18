import { useState } from "react";

import { UserLoginInterface } from "../interfaces/UserInterfaces";

export default function Login({
  handleLogin,
}: {
  handleLogin: (newUser: UserLoginInterface) => void;
}) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };
    await handleLogin(newUser);
    setUsername("");
    setPassword("");
  }

  return (
    <form name="login_form" onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        name="login_form_username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="text"
        value={password}
        name="login_form_password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" name="login_form_login">
        Login
      </button>
    </form>
  );
}
