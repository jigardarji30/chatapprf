import React from "react";
import "./card.css";
import PropTypes from "prop-types";

/**
 * common card container for all pages
 * @author
 * @function Card
 **/

const Card = (props) => {
  return <div>{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.object.isRequired
};

export default Card;
