import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import localStorage from "./__mocks__/storage";

window.localStorage = localStorage;

describe("<App /> Component", () => {
  const user = { nome: "Teste" };

  beforeEach(() => localStorage.clear());

  it("renderiza sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renderiza login", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find("TodoListApp").length).toEqual(0);
    expect(wrapper.find("Login").length).toEqual(1);
  });

  it("valida localstorage quando recarrega", () => {
    localStorage.setItem("user", JSON.stringify(user));
    const wrapper = create(<App />);
    expect(wrapper.toJSON()).toMatchSnapshot("logado");
  });

  it("altera visualizacao apos login", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find("TodoListApp").length).toEqual(0);
    expect(wrapper.find("Login").length).toEqual(1);

    const instance = wrapper.instance();
    instance.setUser(user);

    expect(wrapper.find("TodoListApp").length).toEqual(1);
  });

  it("altera visualizacao apos deslogar", () => {
    const wrapper = create(<App />);
    wrapper.getInstance().logout();
    expect(wrapper.toJSON()).toMatchSnapshot("deslogado");
  });

  it("App Component to match snapshot", () => {
    const wrapper = create(<App />);
    expect(wrapper.toJSON()).toMatchSnapshot("deslogado");
  });

  it("App Component to match snapshot Logado", () => {
    const wrapper = create(<App />);
    const instance = wrapper.getInstance();
    instance.setUser(user);

    expect(wrapper.toJSON()).toMatchSnapshot("logado");
  });
});
