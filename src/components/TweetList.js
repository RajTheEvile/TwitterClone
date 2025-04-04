import React from "react";
import Tweet from "./Tweet";

function TweetList({ tweets }) {
  return (
    <ul className="list-unstyled mt-4">
      {tweets.length === 0 ? (
        <h3 className="text-muted text-center">No Tweets</h3>
      ) : (
        tweets.map((tweet) => <Tweet key={tweet.tweetId} tweet={tweet} />)
      )}
    </ul>
  );
}

export default TweetList;
