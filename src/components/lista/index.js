import React from "react";
import PropTypes from "prop-types";

const Lista = ({ children }) => {
  return <div className="lista">{children}</div>;
};

Lista.propTypes = {
  children: PropTypes.node
};

export { Lista };
