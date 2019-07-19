import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import Login from ".";

jest.mock("services/login.service");
jest.mock("axios");
describe("<Login />", () => {
  it("deve renderizar component sem error", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login />, div);
  });

  it("deve possuir campo de username", () => {
    var component = mount(<Login />);
    expect(component.find("input.login_username").length).toBe(1);
  });

  it("deve possuir campo de password", () => {
    var component = mount(<Login />);

    expect(component.find("input.login_password").length).toBe(1);
  });

  it("deve possuir botao", () => {
    var component = mount(<Login />);

    expect(component.find("button").length).toBe(1);
  });

  it("deve salvar valor de username", () => {
    var component = mount(<Login />);
    const input = component.find("input.login_username");

    input.simulate("change", {
      target: {
        value: "teste"
      }
    });
    expect(input.instance().value).toBe("teste");
  });

  it("deve salvar valor de password", () => {
    var component = mount(<Login />);
    const input = component.find("input.login_password");

    input.simulate("change", {
      target: {
        value: "123123"
      }
    });
    expect(input.instance().value).toBe("123123");
  });

  it("tem mensagem de erro", () => {
    var component = mount(<Login />);
    const button = component.find("button");

    button.simulate("click");

    expect(component.instance().state.hasError).toBe(true);
    expect(component.find("label").length).toBeGreaterThan(0);
  });

  it("retornar erro quando falha na requisicao login", done => {
    var component = mount(<Login />);
    const username = component.find("input.login_username");
    const password = component.find("input.login_password");
    const button = component.find("button");

    username.simulate("change", {
      target: {
        value: "user-error"
      }
    });

    password.simulate("change", {
      target: {
        value: "123"
      }
    });

    button.simulate("click");

    setTimeout(() => {
      component.update();

      expect(component.instance().state.hasError).toBe(true);
      expect(component.find("label").length).toBeGreaterThan(0);

      done();
    });
  });

  it("chama callback onAuthenticate", done => {
    const callback = jest.fn();
    var component = mount(<Login onAuthenticate={callback} />);
    const username = component.find("input.login_username");
    const password = component.find("input.login_password");
    const button = component.find("button");

    username.simulate("change", {
      target: {
        value: "user-correct"
      }
    });

    password.simulate("change", {
      target: {
        value: "123"
      }
    });

    button.simulate("click");

    setTimeout(() => {
      component.update();

      expect(component.instance().state.hasError).toBe(false);
      expect(component.find("label").length).toBe(0);
      expect(callback).toBeCalledTimes(1);
      expect(callback).toBeCalledWith({ id: 123 });
      done();
    });
  });
});
