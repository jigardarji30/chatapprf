import React, { useState } from "react";
import Layout from "../../components/layouts";
import Card from "../../components/UI/Card/card";
import "./register.css";
import { register } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Register
 **/

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password
    };

    dispatch(register(user));
  };

  if (auth.authenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <div className="registerContainer">
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
                <div className="row hRowDiv"></div>
                <div className="row">
                  <form className="form-group form-group-div" onSubmit={registerUser}>
                    <div className="row">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        className="form__input"
                        placeholder="Name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        className="form__input"
                        placeholder="Email"
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
                        value={password}
                        className="form__input"
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row loginDivRow">
                      <button type="submit" className="btn form-control">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="row form-group-div"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
