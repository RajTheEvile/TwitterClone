import React, { useEffect, useState } from "react";
import axios from "axios";
import TweetList from "../components/TweetList";
import TweetForm from "../components/TweetForm";
import Dashboard from '../components/DashBoard'

function Home() {
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    const fetchTweets = async () => {
      const token = localStorage.getItem("token");
      console.log('hi',token)
      const response = await axios.get("http://localhost:5000/user/tweets/feed/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setTweets(response.data);
    };
    fetchTweets();
  }, []);

  return (
    <div className="container mt-4">
      <Dashboard/>
      <TweetForm setTweets={setTweets} />
      <TweetList tweets={tweets} />
    </div>
  );
}

export default Home;
