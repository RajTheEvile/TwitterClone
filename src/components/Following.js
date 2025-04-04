import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Following = () => {
  const [following, setFollowing] = useState([]);
  const token = Cookies.get("token");

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
    <div className="card p-3 mt-3 shadow-sm">
      <h2 className="text-warning">Following</h2>
      {following.length === 0 ? (
        <p className="text-muted">You are not following anyone yet.</p>
      ) : (
        <ul className="list-group">
          {following.map((user, index) => (
            <li key={index} className="list-group-item">
              <Link to={`/profile/${user.username}`} className="text-decoration-none text-dark">
                  <strong>{user.name}</strong> @{user.username}
                </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Following;
