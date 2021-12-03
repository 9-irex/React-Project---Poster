import Access from "./components/auth/acess";
import Join from "./components/auth/join";
import Home from "./components/posts/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./Widgets.css";
import "./Styles/auth.css";
import "./Styles/feeds.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./effects";

function App() {
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/poster/login").then((result) => {
      console.log("Before", result);
      if (result.data.isLoggedIn) {
        console.log("User Logged In");
        // window.location.href = "/";
      } else {
        console.log("User Not Logged In");
        // window.location.href = "/access";
      }
    });
  }, []);
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
