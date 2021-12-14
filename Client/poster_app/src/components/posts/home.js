import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Nav from "./bars/nav";
import Feed from "./bars/feed";
import Posts from "./bars/posts";
import Notifications from "./bars/notifications";
import { setListPosts } from "../../redux/features/post_reducer";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../axios";
import {
  getRequest,
  getSuggest,
  clearRequestList,
} from "../../redux/features/request_reducer";

function Home() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLogged, setLogged] = useState(
    sessionStorage.getItem("loggedStatus")
  );
  const postLists = useSelector((state) => state.post.value.postLists);
  const suggestLists = useSelector((state) => state.request.value.suggests);
  const requestLists = useSelector((state) => state.request.value.reqList);
  const [render, sendRender] = useState(false);
  const [mostFollowed, setMostFollowed] = useState([]);
  const [mostActive, setMostActive] = useState([]);

  useEffect(() => {
    setLogged(sessionStorage.getItem("loggedStatus"));
  }, [location]);

  useEffect(() => {
    isLogged && sendRender(true);
  }, [isLogged, location]);

  useEffect(() => {
    setInterval(() => {
      instance.get("/all_posts").then((response) => {
        if (response.data.Error == null) {
          dispatch(setListPosts(response.data.Message));
        }
      });
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    isLogged &&
      instance.get("/suggest/" + JSON.parse(isLogged).id).then((response) => {
        dispatch(getSuggest(response.data.Message));
      });
  }, [dispatch, isLogged]);

  useEffect(() => {
    // clear request list
    dispatch(clearRequestList());
    instance
      .get("/request/" + JSON.parse(isLogged)?.id + "/Request_sent")
      .then((response) => {
        dispatch(getRequest(response.data.Message));
      });
    instance
      .get("/request/" + JSON.parse(isLogged)?.id + "/Request_recieved")
      .then((response) => {
        dispatch(getRequest(response.data.Message));
      });
  }, [dispatch, isLogged]);

  useEffect(() => {
    instance.get("/followed").then((result) => {
      setMostFollowed(result.data.Message);
    });
  }, []);

  useEffect(() => {
    instance.get("/active").then((result) => {
      setMostActive(result.data.Message);
    });
  }, []);

  !isLogged && history.push("/access");

  return (
    render && (
      <div className="__feed__container">
        <div className="wrapper">
          <Nav activePage="home" user={JSON.parse(isLogged)} />
          <Feed
            user={JSON.parse(isLogged)}
            mostFollowed={mostFollowed}
            mostActive={mostActive}
          />
          <Posts posts={postLists} />
          <Notifications
            user={JSON.parse(isLogged)}
            suggests={suggestLists}
            requestList={requestLists}
          />
        </div>
      </div>
    )
  );
}

export default Home;
