import React, { useEffect, useState } from "react";
import nameCutter from "../../../shrink";

function FeedChat({ chatBox, update, friends }) {
  const [chatUsers, setChatUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    var fixer = [];
    var pusher = [];
    for (let index = 0; index < chatBox.length; index++) {
      const element = chatBox[index];
      if (!fixer.includes(element.UserID)) {
        fixer.push(element.UserID);
        pusher.push(element);
      }
    }

    setChatUsers(pusher);
  }, [chatBox]);
  return (
    <div className="feed_bar">
      <div className="up_bar">
        <p className="title">
          cha<span>ts</span>
        </p>
        <i className="fa fa-user" onClick={() => setShow(!show)}></i>
        <i className="fa fa-bars"></i>
      </div>

      <div className="search_bar">
        <input type="text" placeholder="Search..." />
        <i className="fa fa-search"></i>
      </div>

      <div className="list_chat_boxes">
        {!show
          ? chatUsers.length !== 0 &&
            chatUsers.map((chat) => (
              <div
                className="user_chat__box"
                key={chat.UserID}
                onClick={() =>
                  update(
                    nameCutter(chat.Name),
                    chat.Avatar,
                    chat.UserID,
                    chat.Type,
                    chat.GroupID
                  )
                }
              >
                <div className="user_chat_details">
                  <div className="image">
                    <img
                      src={
                        chat.Avatar.length === 1
                          ? "/Images/Avatars/Image - " + chat.Avatar + ".jpg"
                          : "Images/Uploads/" + chat.Avatar
                      }
                      alt="noe"
                    />
                  </div>
                  <div className="details">
                    <p className="name">{nameCutter(chat.Name)}</p>
                    <p className="last_message">last message sent</p>
                  </div>
                </div>
                {chat.Seen === 0 && <div className="indicator"></div>}
              </div>
            ))
          : friends.length !== 0 &&
            friends.map((friend) => (
              <div
                className="user_chat__box"
                key={friend.UserID}
                onClick={() =>
                  update(
                    nameCutter(friend.Name),
                    friend.Avatar,
                    friend.UserID,
                    friend.Type,
                    friend.GroupID
                  )
                }
              >
                <div className="user_chat_details">
                  <div className="image">
                    <img
                      src={
                        friend.Avatar.length === 1
                          ? "/Images/Avatars/Image - " + friend.Avatar + ".jpg"
                          : "Images/Uploads/" + friend.Avatar
                      }
                      alt="noe"
                    />
                  </div>
                  <div className="details">
                    <p className="name">{nameCutter(friend.Name)}</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    update(
                      nameCutter(friend.Name),
                      friend.Avatar,
                      friend.UserID,
                      "Single",
                      0
                    ) && setShow(false)
                  }
                >
                  <i className="fa fa-arrow-right"></i>
                </button>
                {/* {friend.Seen === 0 && <div className="indicator"></div>} */}
              </div>
            ))}
      </div>
    </div>
  );
}

export default FeedChat;
