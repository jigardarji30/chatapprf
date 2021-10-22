import React from "react";
import Header from "../Header/header";
import PropTypes from "prop-types";

/**
 * common layout for all pages
 * @author
 * @function Layout
 * @returns
 **/
const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;
