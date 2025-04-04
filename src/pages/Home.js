import React, { useEffect, useState } from "react";
import axios from "axios";
import TweetList from "../components/TweetList";
import TweetForm from "../components/TweetForm";
import Dashboard from '../components/DashBoard';
import Navbar from '../components/Navbar';
import Menu from "../components/Menu";
import Cookies from 'js-cookie';

function Home() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:5000/user/tweets/feed/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTweets(response.data);
    };
    fetchTweets();
  }, []);

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        {/* Sidebar Menu */}
        <div className="col-md-3 col-lg-2 d-flex flex-column bg-light vh-100 p-3">
          <Menu />
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <Dashboard />
          <TweetForm setTweets={setTweets} />
          {tweets.length !== 0 ? <TweetList tweets={tweets} /> : <h1>No tweets</h1>}
        </div>
      </div>
    </div>
  );
}

export default Home;
