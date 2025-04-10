import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="d-flex flex-column vh-100 bg-light p-3 sidebar h-100">
      <Link className="btn btn-outline-primary mb-2" to="/">Home</Link>
      <Link className="btn btn-outline-secondary mb-2" to="/search">Search</Link>
    </div>
  );
}

export default Menu;
