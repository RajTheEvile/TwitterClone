import React from "react";
import Feed from "../components/Feed";
import Followers from "../components/Followers";
import Following from "./Following.js";

const Dashboard = () => {
  return (
    <div>
      <h1>Twitter Clone Dashboard</h1>
      <Feed />
      <Following />
      <Followers />
    </div>
  );
};

export default Dashboard;
