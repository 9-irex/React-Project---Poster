import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import instance from "../../../axios";
import {
  initMessage,
  newMessage,
} from "../../../redux/features/message_reducer";

function ChatBar({ user, name, avatar, toID, groupID, type }) {
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);
  const dispatch = useDispatch();

  const sendMessage = () => {
    const date = new Date();
    var left =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var right =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    dispatch(
      initMessage({
        Type: type,
        From: user.id,
        To: toID,
        _Date: left + " " + right,
        GroupID: 0,
        Message: message,
      })
    );
    dispatch(newMessage());
    document.querySelector(".msg_input").value = "";
  };

  useEffect(() => {
    toID !== "" &&
      instance
        .get("/get_messages/" + user.id + "/" + toID + "/" + type)
        .then((results) => {
          setListMessages(results.data.Message);
        });
  }, [user.id, toID, type]);

  return (
    <div className="chat_bar">
      <div className="top">
        <div className="image">
          <img
            src={
              avatar === ""
                ? "/Images/Random/man_1.jpg"
                : avatar.length === 1
                ? "/Images/Avatars/Image - " + avatar + ".jpg"
                : "Images/Uploads/" + avatar
            }
            alt="noe"
          />
        </div>
        <p className="name">{name !== "" ? name : "Unknow Name"}</p>
      </div>

      <div className="board">
        {name !== "" && (
          <div className="wrapper">
            {listMessages.length !== 0 &&
              listMessages.map((item) =>
                item.FromID === user.id ? (
                  <div className="sender" key={item.ChatID}>
                    <div className="box">
                      <div className="message">{item.Message}</div>
                    </div>
                  </div>
                ) : (
                  <div className="reciever" key={item.ChatID}>
                    <div className="box">
                      <div className="img">
                        <img
                          src={
                            avatar === ""
                              ? "/Images/Random/man_1.jpg"
                              : avatar.length === 1
                              ? "/Images/Avatars/Image - " + avatar + ".jpg"
                              : "Images/Uploads/" + avatar
                          }
                          alt=""
                        />
                      </div>
                      <div className="message">{item.Message}</div>
                    </div>
                  </div>
                )
              )}
            {/* <div className="sender">
              <div className="box">
                <div className="message">this is massive</div>
              </div>
            </div>
            <div className="reciever">
              <div className="box">
                <div className="img">
                  <img src="/Images/Random/man_1.jpg" alt="" />
                </div>
                <div className="message">how are you brother</div>
              </div>
            </div> */}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="message">
          <input
            type="text"
            className="msg_input"
            placeholder="type your message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="icon" onClick={sendMessage}>
          <i className="fas fa-paper-plane"></i>
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
