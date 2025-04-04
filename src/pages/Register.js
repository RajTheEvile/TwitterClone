import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "male",
  });
  const [loading, setLoading] = useState(false); // ✅ Track form submission
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/register/", formData);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-25">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="text-center">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="form-control mb-2"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="form-control mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            onChange={handleChange}
            required
            minLength={6}
            className="form-control mb-2"
          />
          <select
            name="gender"
            onChange={handleChange}
            className="form-control mb-3"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link className="btn btn-outline-secondary w-100" to="/login">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
