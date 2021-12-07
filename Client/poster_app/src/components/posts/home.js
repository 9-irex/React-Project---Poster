import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Nav from "./bars/nav";
import Feed from "./bars/feed";
import Posts from "./bars/posts";
import Notifications from "./bars/notifications";

function Home() {
  const history = useHistory();
  const location = useLocation();
  const [isLogged, setLogged] = useState(
    sessionStorage.getItem("loggedStatus")
  );

  useEffect(() => {
    setLogged(sessionStorage.getItem("loggedStatus"));
  }, [location]);

  !isLogged && history.push("/access");
  return (
    <div className="__feed_container">
      <div className="wrapper">
        <Nav user={JSON.parse(isLogged)} />
        <Feed />
        <Posts />
        <Notifications user={JSON.parse(isLogged)} />
      </div>
    </div>
  );
}

export default Home;
