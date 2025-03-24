import React from "react";

function Tweet({ tweet }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">@{tweet.username}</h5>
        <p className="card-text">{tweet.tweet}</p>
        <small className="text-muted">{tweet.dateTime}</small>
      </div>
    </div>
  );
}

export default Tweet;
