import React from "react";
import PropTypes from "prop-types";

export const Item = ({ titulo, complete, onRemove, onComplete }) => (
  <div className="item-todo">
    <input
      className="check-todo-complete"
      type="checkbox"
      disabled
      checked={complete}
    />
    <span
      style={{ textDecoration: complete ? "line-through" : "" }}
      className="todo-label"
    >
      {titulo}
    </span>
    <button className="todo-complete" disabled={complete} onClick={onComplete}>
      &#10004;
    </button>
    <button className="todo-remove" onClick={onRemove}>
      &#10008;
    </button>
  </div>
);

Item.propTypes = {
  complete: false
};

Item.propTypes = {
  complete: PropTypes.bool,
  titulo: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
};
