import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { UserDataContext } from "../Context/UserDataContext";
import Tweet from "../components/Tweet";

const TweetPage = () => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const { userData } = useContext(UserDataContext);

  const fetchTweetData = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.get(`http://localhost:5000/Tweetpage/${tweetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTweet(response.data.tweet);
      setReplies(response.data.replies);
    } catch (error) {
      console.error("Error fetching tweet:", error);
    }
  };

  useEffect(() => {
    fetchTweetData();
  }, [tweetId]);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return alert("Reply cannot be empty");

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `http://localhost:5000/reply/${tweetId}`,
        { reply: replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplyText("");
      setShowReplyBox(false);
      fetchTweetData(); // refresh replies
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };
  console.log(tweet)
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row"> 
        <div className="col-md-2">
          <Menu />
        </div>
        <div className="col-md-10">
          {tweet ? (
            <div className="card my-3 p-3">
              <h5 className="card-title text-primary">@{tweet.username}</h5>
              <h5>{tweet.tweet}</h5>
              <p className="text-muted">🕒 {new Date(tweet.dateTime).toLocaleString()}</p>
              <div className="d-flex gap-3">
                <span>❤️ {tweet.likes}</span>
                <span>💬 {tweet.replies}</span>
              </div>

              {/* Toggle Reply Box */}
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowReplyBox((prev) => !prev)}
                >
                  {showReplyBox ? "Cancel" : "Reply"}
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
                  />
                  <button className="btn btn-success btn-sm" onClick={handleReplySubmit}>
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Loading tweet...</p>
          )}

          <h6 className="mt-4">Replies</h6>
          {replies.length > 0 ? (
            replies.map((reply, index) => (
              <div key={index} className="card my-2 p-2">
                <Tweet tweet={reply} />
              </div>
            ))
          ) : (
            <p className="text-muted">No replies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetPage;
