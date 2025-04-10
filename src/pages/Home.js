import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import TweetList from "../components/TweetList";
import TweetForm from "../components/TweetForm";
import Dashboard from '../components/DashBoard';
import Navbar from '../components/Navbar';
import Menu from "../components/Menu";
import Cookies from 'js-cookie';

import { UserDataContext } from "../Context/UserDataContext";

function Home() {
  const [tweets, setTweets] = useState([]);
  const {userData}=useContext(UserDataContext);
  console.log(userData);
  useEffect(() => {
    const fetchTweets = async () => {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:5000/user/tweets/", {
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
          <div>
            <h2 className="text-center text-primary mb-4">My Tweets</h2>
            <TweetForm setTweets={setTweets} />
            {tweets.length !== 0 ? <TweetList username={userData.username} tweets={tweets} /> : <h1>No tweets</h1>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
