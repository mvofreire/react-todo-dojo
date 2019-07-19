import React, { Component } from "react";
import { TodoListApp } from "./application";
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
    return (
      <div className="App">
        <h1>TODO List App</h1>
        <TodoListApp />
      </div>
    );
  }
}

export default App;
