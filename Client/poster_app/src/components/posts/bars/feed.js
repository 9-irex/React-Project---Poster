import React from "react";

function Feed() {
  return (
    <div class="feed_bar">
      <p class="title">
        fee<span>ds</span>
      </p>
      <div class="post_form">
        <div class="post_wrapper">
          <div class="links">
            <span class="text">text</span>
            <span class="image active">image</span>
          </div>
          <textarea
            placeholder="Enter Post Title"
            class="post_title"
          ></textarea>
          <div class="image_post">
            <img src="/Images/Random/poster_1.jpg" alt="iagent" />
            <label class="label">
              <input type="file" />
              <i class="fa fa-upload"></i>
            </label>
          </div>
        </div>
      </div>
      <button class="new_post" id="post_button">
        new post
      </button>
      <div class="user_lists">
        <div class="head">
          <div>
            <p>top followers</p>
            <i class="fa fa-info-circle"></i>
          </div>
          <i class="fa fa-chart-line"></i>
        </div>
        <div class="body">
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/four.jpg" alt="" />
              </div>
              <span class="user_name">@deiron-10</span>
            </div>
            <div class="number">23.5K</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/one.jpg" alt="" />
              </div>
              <span class="user_name">@aftaab67</span>
            </div>
            <div class="number">23.5K</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/two.jpg" alt="" />
              </div>
              <span class="user_name">@mathews</span>
            </div>
            <div class="number">23.5K</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/man_1.jpg" alt="" />
              </div>
              <span class="user_name">@vegas</span>
            </div>
            <div class="number">23.5K</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/three.jpg" alt="" />
              </div>
              <span class="user_name">@grand</span>
            </div>
            <div class="number">23.5K</div>
          </div>
        </div>
      </div>

      <div class="user_lists">
        <div class="head">
          <div>
            <p>most active</p>
            <i class="fa fa-info-circle"></i>
          </div>
          <i class="fa fa-chart-line"></i>
        </div>
        <div class="body">
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/four.jpg" alt="" />
              </div>
              <span class="user_name">@deiron-10</span>
            </div>
            <div class="number">23%</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/one.jpg" alt="" />
              </div>
              <span class="user_name">@aftaab67</span>
            </div>
            <div class="number">23%</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/two.jpg" alt="" />
              </div>
              <span class="user_name">@mathews</span>
            </div>
            <div class="number">23%</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/man_1.jpg" alt="" />
              </div>
              <span class="user_name">@vegas</span>
            </div>
            <div class="number">23%</div>
          </div>
          <div class="user">
            <div>
              <div class="user_image">
                <img src="/Images/Random/three.jpg" alt="" />
              </div>
              <span class="user_name">@grand</span>
            </div>
            <div class="number">23%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
