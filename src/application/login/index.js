import React, { Component } from "react";
import { doLogin } from "services/login.service";

class Login extends Component {
  state = {
    model: {
      username: "",
      password: ""
    }
  };

  onChange = (e, name) => {
    const { value } = e.target;

    this.setState({
      model: {
        ...this.state.model,
        [name]: value
      }
    });
  };

  onSubmit = async () => {
    const { username, password } = this.state.model;
    const { onAuthenticate } = this.props;

    try {
      if (username === "" || password === "") {
        throw "Login e senha nao preenchidos";
      } else {
        const result = await doLogin({ username, password });
        this.setState({ hasError: false });
        onAuthenticate(result);
      }
    } catch (error) {
      this.setState({
        hasError: true
      });
    }
  };

  render() {
    const { model, hasError } = this.state;
    return (
      <div>
        <input
          name="username"
          className="login_username"
          onChange={e => this.onChange(e, "username")}
          value={model.username}
        />
        <input
          type="password"
          className="login_password"
          onChange={e => this.onChange(e, "password")}
          value={model.password}
        />
        <button onClick={this.onSubmit} />
        {hasError && <label>Erro</label>}
      </div>
    );
  }
}

export default Login;
