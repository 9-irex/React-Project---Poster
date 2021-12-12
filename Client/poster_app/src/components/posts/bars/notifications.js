import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  allowRequest,
  bendRequest,
  ignoreRequest,
  setRequest,
} from "../../../redux/features/request_reducer";

function Notifications({ user, suggests, requestList }) {
  const [notifications, setNotifications] = useState(false);
  const [requests, setRequests] = useState(true);
  const [profile, setProifile] = useState(false);
  const dispatch = useDispatch();

  const showLinks = (type) => {
    if (type === "notifacations") {
      setRequests(false);
      setProifile(false);
      setNotifications(true);
    } else if (type === "requests") {
      setRequests(true);
      setProifile(false);
      setNotifications(false);
    } else {
      setRequests(false);
      setProifile(true);
      setNotifications(false);
    }
  };

  const newRequest = (id) => {
    const date = new Date();
    var left =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var right =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    dispatch(
      setRequest({
        requestID: "",
        From: user.id,
        To: id,
        Status: "Sender",
        Date: left + " " + right,
      })
    );

    dispatch(bendRequest());
  };

  const cancelRequest = (id) => {
    dispatch(
      setRequest({
        requestID: id,
        From: "",
        To: "",
        Status: "Decline",
        Date: "",
      })
    );

    dispatch(ignoreRequest());
  };

  const acceptRequest = (id) => {
    const date = new Date();
    var left =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var right =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    dispatch(
      setRequest({
        requestID: id,
        From: "",
        To: "",
        Status: "Accept",
        Date: left+" "+right,
      })
    );

    dispatch(allowRequest());
  };

  return (
    <div className="notifications">
      <div className="wrapper">
        <div className="links_bar">
          <div
            className={notifications ? "messages link active" : "messages link"}
            onClick={() => showLinks("notifacations")}
          >
            <i className="fa fa-bell"></i>
            <p>Notifications</p>
          </div>
          <div
            className={requests ? "requests link active " : "requests link"}
            onClick={() => showLinks("requests")}
          >
            <i className="fa fa-user-plus"></i>
            <p>Friend Requests</p>
          </div>
          <div
            className={
              profile ? "user_profile link active" : "user_profile link"
            }
            onClick={() => showLinks("profile")}
          >
            <div className="profile">
              <img src={user.avatar} alt="" />
            </div>
            <p>@{user.username}</p>
          </div>
        </div>

        <div className="holder">
          {requests && (
            <React.Fragment>
              <div className="requests">
                <div className="wrapper">
                  {requestList !== undefined ? (
                    requestList.map((requestItem) =>
                      requestItem.map((item) => (
                        <div className="item" key={item.friendID}>
                          <div>
                            <div className="image">
                              <img
                                src={
                                  item.Avatar.length === 1
                                    ? "/Images/Avatars/Image - " +
                                      item.Avatar +
                                      ".jpg"
                                    : "Images/Uploads/" + item.Avatar
                                }
                                alt=""
                              />
                            </div>
                            <span className="name">{"@" + item.Username}</span>
                          </div>
                          {item.FromUser === user.id ? (
                            <div>
                              {/* When user sends a request to other user */}
                              <button
                                className="cancel"
                                onClick={() => cancelRequest(item.friendID)}
                              >
                                Decline
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button
                                className="accept"
                                onClick={() => acceptRequest(item.friendID)}
                              >
                                Accept
                              </button>
                              <button
                                className="cancel"
                                onClick={() => cancelRequest(item.friendID)}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )
                  ) : (
                    <h1>Empty Request</h1>
                  )}
                </div>
              </div>
              <div className="suggestions">
                <div className="wrapper">
                  <span className="suggestion">suggestions</span>
                  {suggests.map(
                    (item) =>
                      item.UserID !== user.id && (
                        <div className="item" key={item.UserID}>
                          <div>
                            <div className="image">
                              <img
                                src={
                                  item.Avatar.length === 1
                                    ? "/Images/Avatars/Image - " +
                                      item.Avatar +
                                      ".jpg"
                                    : "/Images/Uploads/" + item.Avatar
                                }
                                alt="none"
                              />
                            </div>
                            <span className="name">{"@" + item.Username}</span>
                          </div>
                          <div>
                            <button
                              className="request"
                              userid={item.UserID}
                              onClick={() => newRequest(item.UserID)}
                            >
                              request
                            </button>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
