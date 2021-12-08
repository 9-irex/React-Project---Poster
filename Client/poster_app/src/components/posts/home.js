import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Nav from "./bars/nav";
import Feed from "./bars/feed";
import Posts from "./bars/posts";
import Notifications from "./bars/notifications";
import { getPost, initializePost } from "../../redux/features/post_reducer";
import { useDispatch } from "react-redux";

function Home() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLogged, setLogged] = useState(
    sessionStorage.getItem("loggedStatus")
  );
  const [render, sendRender] = useState(false);

  useEffect(() => {
    setLogged(sessionStorage.getItem("loggedStatus"));
  }, [location]);

  useEffect(() => {
    isLogged && sendRender(true);
  }, [isLogged, location]);

  useEffect(() => {
    dispatch(
      initializePost({
        Title: "",
        Image: "",
        UserID: "",
        Date: "",
        Type: "Get_Post",
      })
    );

    try {
      dispatch(getPost());
    } catch (error) {
      console.log("Catch Error", error);
    }
  }, [dispatch]);
  !isLogged && history.push("/access");

  return (
    render && (
      <div className="__feed__container">
        <div className="wrapper">
          <Nav user={JSON.parse(isLogged)} />
          <Feed />
          <Posts />
          <Notifications user={JSON.parse(isLogged)} />
        </div>
      </div>
    )
  );
}

export default Home;
