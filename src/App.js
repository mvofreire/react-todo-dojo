import React, { Component } from "react";
import { TodoListApp, Login } from "./application";
import "./App.css";

class App extends Component {
  state = {
    user: false
  };

  componentDidMount() {
    this.validateLoggedUser();
  }

  validateLoggedUser = () => {
    if (localStorage && "user" in localStorage) {
      const user = JSON.parse(localStorage.getItem("user"));
      this.setUser(user);
    }
  };

  setUser = user => {
    this.setState({ user }, _ => {
      localStorage && localStorage.setItem("user", JSON.stringify(user));
    });
  };

  logout = () => {
    this.setUser(false);
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <h1>TODO List App</h1>
        {user && (
          <span className="link-logout" onClick={this.logout}>
            logout ({user.nome})
          </span>
        )}
        {!!user ? <TodoListApp /> : <Login onAuthenticate={this.setUser} />}
      </div>
    );
  }
}

export default App;
