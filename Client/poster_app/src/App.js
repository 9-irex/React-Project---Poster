import Access from "./components/auth/acess";
import Join from "./components/auth/join";
import Home from "./components/posts/home";
import "./Widgets.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  // States
  const [isLogged, setLogged] = useState(false); // Defualt value[ False ] => NOTE: This state has a Datatype of boolean

  // FUnction the checks the sessions of the project
  const checkSessions = () => {
    if (sessionStorage.getItem("UserCredentials")) {
      console.log(
        "UserCredentials",
        JSON.parse(sessionStorage.getItem("UserCredentials")).Username
      );
      setLogged(true);
    } else {
      setLogged(false);
    }

    // Logged in session
    if (isLogged) {
      // Home Page => Redirect
      console.log("Home Page => Redirect");
      // window.location.replace("http://localhost:3000/");
    } else {
      // Login Page => Redirect
      console.log("Login Page => Redirect");
      // window.location.replace("http://localhost:3000/access");
    }
  };

  useEffect(() => {
    // Update session states
    checkSessions();
  });

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/join" exact component={Join}></Route>
        <Route path="/access" exact component={Access}></Route>
      </Switch>
    </Router>
  );
}

export default App;
