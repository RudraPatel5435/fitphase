import { useState } from "react";
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:3000/api/user/login", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user._id);
    onLogin(res.data.user);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        placeholder="Username"
        className="border p-2 w-full mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
