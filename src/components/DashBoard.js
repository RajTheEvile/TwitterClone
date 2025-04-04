import React from "react";
import Feed from "../components/Feed";
import Followers from "../components/Followers";
import Following from "./Following.js";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Twitter Clone Dashboard</h1>
      <div className="row">
        <div className="col-lg-8">
          <Feed />
        </div>
        <div className="col-lg-4">
          <Following />
          <Followers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
