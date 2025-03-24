import React, { useEffect, useState } from "react";
import axios from "axios";

const Following = () => {
  const [following, setFollowing] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/following/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowing(response.data);
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    fetchFollowing();
  }, [token]);

  return (
    <div className="container mt-4">
      <h2>Following</h2>
      {following.length === 0 ? (
        <p>You are not following anyone yet.</p>
      ) : (
        <ul className="list-group">
          {following.map((user, index) => (
            <li key={index} className="list-group-item">
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Following;
