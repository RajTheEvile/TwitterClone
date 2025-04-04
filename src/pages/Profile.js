import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { UserDataContext } from "../Context/UserDataContext";
import TweetList from "../components/TweetList";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { userData } = useContext(UserDataContext) ?? {}; // ✅ Safe nullish check

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("Unauthorized");

        const response = await axios.get(`http://localhost:5000/profile/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setIsFollowing(response.data.followingStatus ?? false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [username]);

  const handleFollowToggle = async () => {
    if (!userData) return alert("Please log in to follow/unfollow users!");
    const token = Cookies.get("token");
    const action = isFollowing ? "unfollow" : "follow";

    try {
      await axios.post(`http://localhost:5000/${action}/${username}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsFollowing(!isFollowing);
      alert(`You have ${isFollowing ? "unfollowed" : "followed"} ${username}`);
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${action} user`);
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <div className="col-md-2">
          <Menu />
        </div>
        <div className="col-md-10">
          {user ? (
            <div className="card w-100">
              <div className="banner w-100 bg-dark" style={{ height: "200px" }} />
              <div className="d-flex align-items-center p-3">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="rounded-circle border"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="ms-3">
                  <h3>{user.name}</h3>
                  <p className="text-muted">@{user.username}</p>
                  <p><strong>Gender:</strong> {user.gender || "Not specified"}</p>
                  <div className="d-flex gap-3">
                    <span><strong>{user.followingCount}</strong> Following</span>
                    <span><strong>{user.followerCount}</strong> Followers</span>
                  </div>
                  <button
                    className={`btn ${isFollowing ? "btn-danger" : "btn-primary"} mt-2`}
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button className="nav-link active">Posts</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Replies</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Highlights</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Media</button>
                </li>
              </ul>
              <div className="tweets p-3">
                <TweetList tweets={user.tweets} />
              </div>
            </div>
          ) : (
            <h3 className="text-center text-muted">Loading profile...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
