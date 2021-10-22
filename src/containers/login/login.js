import React, { useState } from "react";
import Layout from "../../components/layouts";
import Card from "../../components/UI/Card/card";
import "./login.css";
import { signin } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

/**
 * @author
 * @function Login
 **/

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Email is required");
    }

    if (password === "") {
      alert("Password is required");
    }

    dispatch(signin({ email, password }));
  };

  if (auth.authenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <div className="main-content bg-success text-center main-content-div">
            <div className="col-md-4 text-center company__info">
              <span className="company__logo">
                <h2>
                  <span className="fa fa-android"></span>
                </h2>
              </span>
              <h4 className="company_title">ChatApp</h4>
            </div>
            <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div className="container-fluid">
                <div className="row rowDiv"></div>
                <div className="row">
                  <form className="form-group form-group-div" onSubmit={userLogin}>
                    <div className="row">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form__input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form__input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row loginDivRow">
                      <button type="submit" className="btn form-control">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
