import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }
    localStorage.setItem("username", username);
    onLogin(username);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Task Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", marginLeft: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
