import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    axios.get("http://localhost:5000/user/followers/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setFollowers(response.data))
      .catch((error) => alert(error.response.data));
  }, [token]);
  //console.log(followers)
  return (
    <div className="card p-3 mt-3 shadow-sm">
      <h2 className="text-success">Followers</h2>
      {followers.length === 0 ? (
        <h3 className="text-danger">No Followers</h3>
      ) : (
        <ul className="list-group">
          {followers.map((user, index) => (
            <li key={index} className="list-group-item">
              <Link to={`/profile/${user.username}`} className="text-decoration-none text-dark">
                  <strong>{user.name}</strong> @{user.name}
                </Link>
              {}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Followers;
