import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/home/home";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import PrivateRoute from "./components/privateRoute";
import React, { useEffect } from "react";
import { isLoggedInUser } from "./actions/index";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Router>
    </div>
  );
}

export default App;
