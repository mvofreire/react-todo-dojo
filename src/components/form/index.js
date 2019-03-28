import React, { Component } from "react";
import PropTypes from "prop-types";

export const hasDuplicatedTodos = (todos, item) => {
  return todos.filter(x => x.titulo === item).length > 0;
};
export const ENTER_CODE = 13;
export const ESC_CODE = 27;
export const MESSAGES = {
  ERROR_TITULO: "Digite um titulo para o TODO",
  ERROR_DUPLICADO: "Ja existe um TODO com o titulo duplicado!"
};
class Form extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
      error: false,
      errorDuplicado: false
    };
    this.inputElement = null;
    this.events = {
      [ENTER_CODE]: this.onClickCreateButton,
      [ESC_CODE]: this.onClearButtonClick
    };
  }

  componentDidMount() {
    this.setInputFocus();
  }

  setInputFocus = () => {
    this.inputElement && this.inputElement.focus();
  };

  onInputChange = e => {
    const { value } = e.target;

    this.setError(false);
    this.setErrorDuplicado(false);
    this.setTitulo(value);
  };

  validateEnterPress = e => {
    const { keyCode } = e;
    this.events[keyCode] && this.events[keyCode]();
  };

  onClickCreateButton = () => {
    const { titulo } = this.state;
    const { onCreate, todos, canAdd } = this.props;
    if (hasDuplicatedTodos(todos, titulo)) {
      this.setErrorDuplicado(true);
    } else if (!!titulo) {
      this.setErrorDuplicado(false);
      this.setError(false);

      if (canAdd) {
        onCreate && onCreate({ titulo, complete: false });
      } else {
        this.setError(true);
      }
      this.setTitulo("");
    } else {
      this.setError(true);
    }
    this.setInputFocus();
  };

  onClearButtonClick = _ => {
    this.setError(false);
    this.setErrorDuplicado(false);
    this.setTitulo("");
    this.setInputFocus();
  };

  setError = error => {
    this.setState({
      error
    });
  };

  setErrorDuplicado = errorDuplicado => {
    this.setState({
      errorDuplicado
    });
  };

  setTitulo = titulo => {
    this.setState({
      titulo
    });
  };

  render() {
    const { error, errorDuplicado, titulo } = this.state;
    return (
      <div className="form-todo">
        {error && <span className="error">{MESSAGES.ERROR_TITULO}</span>}
        {errorDuplicado && (
          <span className="error erro-duplicado">
            {MESSAGES.ERROR_DUPLICADO}
          </span>
        )}
        <br />
        <input
          className="input-form-todo"
          ref={node => (this.inputElement = node)}
          value={titulo}
          onChange={this.onInputChange}
          onKeyUp={this.validateEnterPress}
        />
        <button className="btn btn-add" onClick={this.onClickCreateButton}>
          Adicionar
        </button>
        <button className="btn btn-clear" onClick={this.onClearButtonClick}>
          Limpar
        </button>
      </div>
    );
  }
}

Form.defaultProps = {
  todos: [],
  canAdd: true
};

Form.propTypes = {
  onCreate: PropTypes.func,
  canAdd: PropTypes.bool
};

export { Form };
