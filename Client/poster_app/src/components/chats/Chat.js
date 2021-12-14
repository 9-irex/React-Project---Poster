import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import instance from "../../axios";
import Nav from "../posts/bars/nav";
import ChatBar from "./bars/chat_bar";
import FeedChat from "./bars/feed__chat";

function Chat() {
  const [isLogged, setLogged] = useState(
    sessionStorage.getItem("loggedStatus")
  );
  const history = useHistory();
  const location = useLocation();
  const [render, sendRender] = useState(false);
  const [chatBox, setChatBox] = useState([]);
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [toID, setToID] = useState("");
  const [type, setType] = useState("");
  const [groupID, setGroupID] = useState("");

  const updateDetails = (__name, __avatar, __toid, __type, __groupid) => {
    setName(__name);
    setAvatar(__avatar);
    setToID(__toid);
    setType(__type);
    setGroupID(__groupid);
  };

  useEffect(() => {
    setLogged(sessionStorage.getItem("loggedStatus"));
  }, [location]);

  useEffect(() => {
    isLogged && sendRender(true);
  }, [isLogged, location]);

  useEffect(() => {
    instance.get("/chat_boxes/" + JSON.parse(isLogged).id).then((result) => {
      setChatBox(result.data.Message);
    });
  }, [isLogged]);

  useEffect(() => {
    instance.get("/get_friends/" + JSON.parse(isLogged).id).then((result) => {
      setFriends(result.data.Message);
    });
  }, [isLogged]);

  !isLogged && history.push("/access");

  return (
    render && (
      <div className="__chat__container">
        <div className="wrapper">
          <Nav activePage="chat" user={JSON.parse(isLogged)} />
          <FeedChat
            chatBox={chatBox}
            update={updateDetails}
            friends={friends}
          />
          <ChatBar
            user={JSON.parse(isLogged)}
            name={name}
            avatar={avatar}
            toID={toID}
            type={type}
            groupID={groupID}
          />
        </div>
      </div>
    )
  );
}
export default Chat;
