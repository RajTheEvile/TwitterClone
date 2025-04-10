import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


import TweetList from "./TweetList";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    axios.get("http://localhost:5000/user/tweets/feed/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setTweets(response.data))
      .catch((error) => alert(error.response.data));
  }, [token]);

  //console.log(tweets)
  return (
    <div className="container mt-3">
      <h2 className="text-info">Tweet Feed</h2>
      <TweetList tweets={tweets} />
    </div>
  );
};

export default Feed;
