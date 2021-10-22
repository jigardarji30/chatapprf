import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./header.css";
import { logout } from "../../actions/index";

/**
 * Header function for show header common for all pages
 * @function Header
 * @returns
 **/
const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="displayFlex">
        <div className="logo">jd</div>

        {!auth.authenticated ? (
          <ul className="leftMenu">
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>Register</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="menuDiv"> {auth.authenticated ? `hi ${auth.name}` : ""} </div>
      <ul className="menu">
        {auth.authenticated ? (
          <li>
            <Link
              to={"#"}
              onClick={() => {
                dispatch(logout(auth.uid));
              }}
            >
              Logout
            </Link>
          </li>
        ) : null}
      </ul>
    </header>
  );
};

export default Header;
