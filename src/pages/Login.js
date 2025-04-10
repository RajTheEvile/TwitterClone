import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserDataContext";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext) ?? {}; // ✅ Safe nullish coalescing check

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/login/", credentials);
      const { jwtToken, userId, username, name } = response.data;

      if (!jwtToken) throw new Error("Token not received");

      // ✅ Store JWT token securely in cookies for 1 day
      Cookies.set("token", jwtToken, { expires: 1, secure: true, sameSite: "Strict" });

      // ✅ Set user data in context
      setUserData?.({ userId, username, name });

      // ✅ Redirect to home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-25">
        <div className="container mt-5">
              <h2 className="text-center pb-2 ">Login</h2>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleLogin} className="text-center">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control mb-4"
                  placeholder="Password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
                <Link className="btn btn-outline-secondary w-100" to="/register">Register</Link>
              </form>
            </div>
      </div>

      
    </div>
    
  );
}

export default Login;
