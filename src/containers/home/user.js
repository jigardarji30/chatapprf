import React from "react";
import PropTypes from "prop-types";
import "./user.css";

/**
 * list all users in home page
 * @param {*} props
 * @returns
 */
const User = (props) => {
  const { user, onClick } = props;
  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
      </div>
      <div className="divShow">
        <span style={{ fontWeight: 500 }}>{user.name}</span>
        <span>{user.isOnline ? "online" : "offline"}</span>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default User;
