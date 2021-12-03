import React from "react";
import Nav from "./bars/nav";
import Feed from "./bars/feed";
import Posts from "./bars/posts";
import Notifications from "./bars/notifications";

function Home() {
  return (
    <div className="__feed_container">
      <div className="wrapper">
        <Nav />
        <Feed />
        <Posts />
        <Notifications />
      </div>
    </div>
  );
}

export default Home;
