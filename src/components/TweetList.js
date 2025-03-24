import React from "react";
import Tweet from "./Tweet";

function TweetList({ tweets }) {
  return (
    <div className="mt-4">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

export default TweetList;
