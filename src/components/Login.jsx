import React, { useState } from "react";

function Login({ onLoginStatusChange, onSignupClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (username.trim() !== "" && password.trim() !== "") {
      // Assuming login is successful
      onLoginStatusChange(true);
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
        {/* Add onClick event to handle signup click */}
        <button type="button" onClick={onSignupClick}>Signup</button>
      </form>
    </div>
  );
}

export default Login;
