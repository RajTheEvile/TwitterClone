import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/user/tweets/feed/", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => setTweets(response.data))
      .catch(error => alert(error.response.data));
  }, []);

  return (
    <div>
      <h2>Tweet Feed</h2>
      {tweets.map((tweet, index) => (
        <div key={index}>
          <h4>@{tweet.username}</h4>
          <p>{tweet.tweet}</p>
          <small>{tweet.dateTime}</small>
        </div>
      ))}
    </div>
  );
};

export default Feed;
