import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    axios.get("http://localhost:5000/user/tweets/feed/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setTweets(response.data))
      .catch((error) => alert(error.response.data));
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="text-info">Tweet Feed</h2>
      {tweets.map((tweet, index) => (
        <div key={index} className="card shadow-sm p-3 mb-3">
          <h4 className="text-primary">@{tweet.username}</h4>
          <p className="mb-1">{tweet.tweet}</p>
          <small className="text-muted">{tweet.dateTime}</small>
        </div>
      ))}
    </div>
  );
};

export default Feed;
