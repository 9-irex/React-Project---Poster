import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Nav from "./bars/nav";
import Feed from "./bars/feed";
import Posts from "./bars/posts";
import Notifications from "./bars/notifications";
import { setListPosts } from "../../redux/features/post_reducer";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../axios";

function Home() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLogged, setLogged] = useState(
    sessionStorage.getItem("loggedStatus")
  );
  const postLists = useSelector((state) => state.post.value.postLists);
  const [render, sendRender] = useState(false);

  useEffect(() => {
    setLogged(sessionStorage.getItem("loggedStatus"));
  }, [location]);

  useEffect(() => {
    isLogged && sendRender(true);
  }, [isLogged, location]);

  useEffect(() => {
    instance.get("/all_posts").then((response) => {
      if (response.data.Error == null) {
        dispatch(setListPosts(response.data.Message));
      }
    });
  }, [dispatch]);

  !isLogged && history.push("/access");

  return (
    render && (
      <div className="__feed__container">
        <div className="wrapper">
          <Nav user={JSON.parse(isLogged)} />
          <Feed />
          <Posts posts={postLists} />
          <Notifications user={JSON.parse(isLogged)} />
        </div>
      </div>
    )
  );
}

export default Home;
