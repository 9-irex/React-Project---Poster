import React, { useState } from "react";
import getElapsedTime from "../../../timing";
import { useDispatch } from "react-redux";
import {
  initializePost,
  likePosts,
  unlikePosts,
} from "../../../redux/features/post_reducer";

function Posts({ posts }) {
  const dispatch = useDispatch();
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
    e.target.classList.toggle("fa-heart-class-toggler");
  };

  return (
    <div className="posts">
      <div className="wrapper">
        {posts.length !== 0 ? (
          posts.map((post) => (
            <div className="post_box" key={post.PostID} postid={post.PostID}>
              <div className="top__bar">
                <div>
                  <div className="image">
                    <img
                      src={
                        post.Avatar.length === 1
                          ? "/Images/Avatars/Image - " + post.Avatar + ".jpg"
                          : "Images/Uploads/" + post.Avatar
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <span className="name">{post.Name}</span>
                    <span className="date">
                      {getElapsedTime(post.Date.toString()).Date_String}
                    </span>
                  </div>
                </div>
                <i className="fa fa-bars"></i>
              </div>
              <div className="postTitle">{post.Title}</div>
              {post.Image !== "" && (
                <div className="middle_bar">
                  <img src={"/Images/Uploads/" + post.Image} alt="" />
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
  );
}

export default Posts;
