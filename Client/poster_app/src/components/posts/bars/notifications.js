import React from "react";

function Notifications() {
  return (
    <div className="notifications">
      <div className="wrapper">
        <div className="links_bar">
          <div className="messages link">
            <i className="fa fa-bell"></i>
            <p>Notifications</p>
          </div>
          <div className="requests link active">
            <i className="fa fa-user-plus"></i>
            <p>Friend Requests</p>
          </div>
          <div className="user_profile link">
            <div className="profile">
              <img src="/Images/Random/one.jpg" alt="" />
            </div>
            <p>@deiron-10</p>
          </div>
        </div>

        <div className="holder">
          <div className="requests __show">
            <div className="wrapper">
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/three.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="accept">accept</button>
                  <button className="cancel">cancel</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/two.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="accept">accept</button>
                  <button className="cancel">cancel</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/four.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="accept">accept</button>
                  <button className="cancel">cancel</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/three.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="accept">accept</button>
                  <button className="cancel">cancel</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/two.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="accept">accept</button>
                  <button className="cancel">cancel</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/four.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="accept">accept</button>
                  <button className="cancel">cancel</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/four.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="accept">accept</button>
                  <button className="cancel">cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className="suggestions __show">
            <div className="wrapper">
              <span className="suggestion">suggestions</span>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/three.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="request">request</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/one.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="request">request</button>
                </div>
              </div>
              <div className="item">
                <div>
                  <div className="image">
                    <img src="/Images/Random/man_1.jpg" alt="none" />
                  </div>
                  <span className="name">@deiron-10</span>
                </div>
                <div>
                  <button className="request">request</button>
                </div>
              </div>
            </div>
          </div>
          <div className="not_alerts __hide">
            <div className="wrapper">
              <div className="box">
                <div>
                  <div className="image">
                    <img src="/Images/Random/four.jpg" alt="good" />
                  </div>
                  <p className="message">@aaron_vargas has posted new feed</p>
                </div>
                <p className="time">12 min</p>
              </div>
              <div className="box">
                <div>
                  <div className="activity">
                    <img src="/Images/SVG/activity_white.svg" alt="good" />
                  </div>
                  <p className="message">
                    this platform has a Multifunctional purposed and i decoded
                    to improve it.
                  </p>
                </div>
                <p className="time">12 min</p>
              </div>
            </div>
          </div>
          <div className="profile_view __hide">
            <div className="wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
