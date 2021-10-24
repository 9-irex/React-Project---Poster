import Access from "./components/auth/acess";
import Join from "./components/auth/join";
import Home from "./components/posts/home";
import "./Widgets.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
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
