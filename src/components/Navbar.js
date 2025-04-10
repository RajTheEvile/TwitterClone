import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserDataContext } from "../Context/UserDataContext";

function Navbar() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);

  const logout = () => {
    Cookies.remove("token");
    setUserData({});
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 h-100">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Twitter Clone</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <button className="btn btn-outline-light" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
