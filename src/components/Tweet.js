import React from "react";

function Tweet({ tweet }) {
  return (
    <li className="card shadow-sm border-0 mb-3">
      <div className="card-body">
        <h5 className="card-title text-primary">@{tweet.username}</h5>
        <p className="card-text">{tweet.tweet}</p>
        <small className="text-muted">{tweet.dateTime}</small>
      </div>
    </li>
  );
}

export default Tweet;
