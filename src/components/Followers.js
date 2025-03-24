import React, { useEffect, useState } from "react";
import axios from "axios";

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios.get("http://localhost:5000/user/followers/", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => setFollowers(response.data))
      .catch(error => alert(error.response.data));
  }, []);

  return (
    <div>
      <h2>Followers</h2>
      <ul>{followers.map((user, index) => <li key={index}>{user.name}</li>)}</ul>
    </div>
  );
};

export default Followers;
