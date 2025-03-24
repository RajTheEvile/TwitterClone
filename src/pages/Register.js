import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "male",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register/", formData);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="gender" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
