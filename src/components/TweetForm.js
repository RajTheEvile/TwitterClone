import React, { useState } from "react";
import axios from "axios";

function TweetForm({ setTweets }) {
  const [tweet, setTweet] = useState("");

  const handlePostTweet = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/user/tweets/",
      { tweet },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTweet("");
  };

  return (
    <form onSubmit={handlePostTweet} className="mb-3">
      <textarea
        className="form-control mb-2"
        placeholder="What's happening?"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-100">Tweet</button>
    </form>
  );
}

export default TweetForm;
