import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate(); // Move useNavigate here

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Use navigate here
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/home">Twitter Clone</Link>
        <div>
          <Link className="btn btn-light mx-2" to="/login">Login</Link>
          <Link className="btn btn-light" to="/register">Register</Link>
        </div>
        <div>
          <button className="btn btn-light mx-2" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
