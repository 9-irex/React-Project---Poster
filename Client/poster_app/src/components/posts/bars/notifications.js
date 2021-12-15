import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import instance from "../../../axios";
import $ from "jquery";
import {
  initializePost,
  likePosts,
  unlikePosts,
} from "../../../redux/features/post_reducer";
import {
  allowRequest,
  bendRequest,
  ignoreRequest,
  setRequest,
} from "../../../redux/features/request_reducer";
import nameCutter from "../../../shrink";
import getElapsedTime from "../../../timing";

function Notifications({ user, suggests, requestList }) {
  const [notifications, setNotifications] = useState(false);
  const [requests, setRequests] = useState(true);
  const [profile, setProifile] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [howMany, setHowMany] = useState([]);
  const dispatch = useDispatch();
  const [previewIMG, setPreviewIMG] = useState("");

  const [like_toggle, setLikeToggle] = useState(1);

  const LikePost = (id, e) => {
    if (like_toggle === 1) {
      dispatch(
        initializePost({
          PostID: id,
          Title: 1,
          Image: "",
          UserID: "",
          Date: "",
          Type: "Like",
        })
      );
      dispatch(likePosts());
      setLikeToggle(2);
    } else {
      dispatch(
        initializePost({
          PostID: id,
          Title: "",
          Image: "",
          UserID: "",
          Date: "",
          Type: "Unlike",
        })
      );
      dispatch(unlikePosts());
      setLikeToggle(1);
    }
    e.target.classList.toggle("fa-heart-className-toggler");
  };

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
        Date: left + " " + right,
      })
    );

    dispatch(allowRequest());
  };

  const EditProfile = () => {
    $(".edit_form").slideToggle(400);
  };

  function displayImage(e) {
    if (e) {
      var reader = new FileReader();
      reader.readAsDataURL(e);
      reader.onload = function (e) {
        setPreviewIMG(reader.result);
      };
    }
  }

  const handleFileUpload = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    const file = e.target.files[0];
    displayImage(file);
    form_data.append("postImage", file);
    const response = instance.post("/upload", form_data);
    console.log(response);
    // const base64 = await convertToBase64(file);
  };

  useEffect(() => {
    instance.get("/get_user_posts/" + user.id).then((response) => {
      setUserPosts(response.data.Message);
    });
    instance.get("/how_many/" + user.id).then((response) => {
      setHowMany(response.data.Message);
    });
  }, [user.id]);

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
          {profile && (
            <React.Fragment>
              <div className="profile_view">
                <div className="wrapper">
                  <div className="profile_details">
                    <div className="wrapper">
                      <div>
                        <div className="profile_lighter">
                          <div className="change_image">
                            <label htmlFor="image">
                              <input
                                type="file"
                                id="file"
                                onChange={handleFileUpload}
                              />
                              <i className="fa fa-user"></i>
                            </label>
                          </div>
                          <div className="profile_image">
                            <img
                              src={previewIMG === "" ? user.avatar : previewIMG}
                              alt=""
                            />
                          </div>
                        </div>
                        <p className="name">{nameCutter(user.name)}</p>
                        <p className="username">@{user.username}</p>
                      </div>

                      <div>
                        <div className="numbers_summary">
                          <div className="__posts">
                            <span className="no">{howMany[0].Posts}</span>
                            <span className="title">posts</span>
                          </div>
                          <div className="__followers">
                            <span className="no">{howMany[0].Freinds}</span>
                            <span className="title">friends</span>
                          </div>
                          <div className="__likes">
                            <span className="no">{howMany[0].Likes}</span>
                            <span className="title">likes</span>
                          </div>
                        </div>
                        <button className="edit_profile" onClick={EditProfile}>
                          edit profile
                        </button>
                      </div>

                      <div className="edit_form">
                        <div className="wrapper">
                          <div className="iii">
                            <div>
                              <input
                                type="text"
                                placeholder="Name"
                                defaultValue={user.name}
                              />
                            </div>
                            <div>
                              <input
                                type="email"
                                placeholder="Email"
                                defaultValue={user.email}
                              />
                            </div>
                          </div>
                          <div className="iii">
                            <div>
                              <input
                                type="text"
                                placeholder="Phone"
                                defaultValue={user.phone}
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder="Username"
                                defaultValue={user.username}
                              />
                            </div>
                          </div>
                          <div className="iii">
                            <div>
                              <input
                                type="text"
                                placeholder="Password"
                                defaultValue={user.password}
                              />
                            </div>
                            <div>
                              <select required defaultValue={user.gender}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male Gender</option>
                                <option value="Female">Female Gender</option>
                              </select>
                            </div>
                          </div>
                          <div className="iii">
                            <div>
                              <span className="indicator">* Birthdate</span>
                              <input
                                type="date"
                                required
                                placeholder="Your Brithday"
                                defaultValue={user.birthday}
                              />
                            </div>
                            <div>
                              <span className="indicator">* Date</span>
                              <input
                                type="date"
                                required
                                placeholder="Current Date"
                                defaultValue={user.date}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="posts_details">
                    <div className="wrapper">
                      {userPosts.length !== 0 ? (
                        userPosts.map((post) => (
                          <div
                            className="post_box"
                            key={post.PostID}
                            postid={post.PostID}
                          >
                            <div className="top__bar">
                              <div>
                                <div className="image">
                                  <img
                                    src={
                                      post.Avatar.length === 1
                                        ? "/Images/Avatars/Image - " +
                                          post.Avatar +
                                          ".jpg"
                                        : "Images/Uploads/" + post.Avatar
                                    }
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <span className="name">
                                    {nameCutter(post.Name)}
                                  </span>
                                  <span className="date">
                                    {
                                      getElapsedTime(post.Date.toString())
                                        .Date_String
                                    }
                                  </span>
                                </div>
                              </div>
                              <i className="fa fa-bars"></i>
                            </div>
                            <div className="postTitle">{post.Title}</div>
                            {post.Image !== "" && (
                              <div className="middle_bar">
                                <img
                                  src={"/Images/Uploads/" + post.Image}
                                  alt=""
                                />
                              </div>
                            )}
                            <div className="last__bar">
                              <div onClick={(e) => LikePost(post.PostID, e)}>
                                <i className="fa fa-heart"></i>
                                <p>{post.Likes}</p>
                              </div>
                              <div>
                                <i className="fa fa-comment"></i>
                                <p>0</p>
                              </div>
                              <div>
                                <i className="fa fa-share"></i>
                                <p>{post.Shares}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h1>Empty Posts</h1>
                      )}
                    </div>
                  </div>
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
