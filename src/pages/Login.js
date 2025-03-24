import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login/", credentials);
      console.log( response.data.jwtToken)
      localStorage.setItem("token", response.data.jwtToken);
      navigate("/home");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
