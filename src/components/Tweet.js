import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Tweet({ username, tweet }) {
  const navigate = useNavigate();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
 //console.log(tweet)

  const handleTweetClick = () => {
    navigate(`/Tweetpage/${tweet.tweetId}`);
  };

  const handleReply = async (e) => {
    e.stopPropagation(); // prevent navigating when replying
    const token = Cookies.get("token");
    try {
      await axios.post(
        `http://localhost:5000/reply/${tweet.tweetId}`,
        { reply: replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReplyText("");
      setShowReplyBox(false);
      alert("Reply posted!");
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <li
      className="card shadow-sm border-0 mb-3"
      onClick={handleTweetClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        <h5 className="card-title text-primary">
          @{username !== undefined ? username : tweet.username}
        </h5>
        <p className="card-text">{tweet.tweet}</p>
        <div>
          <p className="card-text">❤️ {tweet.likes} likes</p>
          <p className="card-text d-inline">💬 {tweet.replies} replies</p>
        </div>
        <small className="text-muted">🕒 {tweet.dateTime}</small>

        {/* Reply toggle button */}
        <div className="mt-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={(e) => {
              e.stopPropagation();
              setShowReplyBox((prev) => !prev);
            }}
          >
            Reply
          </button>
        </div>

        {showReplyBox && (
          <div className="mt-2">
            <textarea
              className="form-control mb-2"
              rows="2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="btn btn-success btn-sm"
              onClick={handleReply}
            >
              Submit Reply
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default Tweet;
