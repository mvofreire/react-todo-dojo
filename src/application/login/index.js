import React, { Component } from "react";
import PropTypes from "prop-types";
import { doLogin } from "services/login.service";

export const MESSAGES = {
  FORM_ERROR: "Preencha todos os campos",
  REQUEST_ERROR: ""
};

class Login extends Component {
  static propTypes = {
    onAuthenticate: PropTypes.func.isRequired
  };

  state = {
    error: false,
    login: {}
  };

  onChangeInput = e => {
    const { name, value } = e.target;
    this.setState({
      login: {
        ...this.state.login,
        [name]: value
      }
    });
  };

  makeLogin = async () => {
    const { onAuthenticate } = this.props;
    const { login } = this.state;

    if (this.validate()) {
      this.setError(MESSAGES.FORM_ERROR);
    } else {
      try {
        const result = await doLogin(login);
        onAuthenticate && onAuthenticate(result);
      } catch (error) {
        this.setError(MESSAGES.REQUEST_ERROR);
      }
    }
  };

  validate = () => {
    const { login } = this.state;
    return !!login.username === false || !!login.password === false;
  };

  setError = error => {
    this.setState({
      error
    });
  };

  render() {
    const { login, error } = this.state;
    return (
      <div className="login">
        <input
          defaultValue={login.username}
          name="username"
          placeholder="Usuario"
          type="text"
          autoComplete="off"
          className="username"
          onChange={this.onChangeInput}
        />
        <input
          name="password"
          defaultValue={login.password}
          type="password"
          placeholder="Senha"
          className="password"
          autoComplete="off"
          onChange={this.onChangeInput}
        />
        <button onClick={this.makeLogin} className="btn btn-login">
          Login
        </button>
        {error !== false && <span className="login-error">{error}</span>}
      </div>
    );
  }
}

export { Login };
