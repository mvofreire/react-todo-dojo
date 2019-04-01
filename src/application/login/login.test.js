import React from "react";
import ReactDOM from "react-dom";
import { Login, MESSAGES } from ".";
import { shallow, mount } from "enzyme";

jest.mock("services/login.service");

describe("<Login /> Component", () => {
  const props = {
    onAuthenticate: () => {}
  };

  it("renderiza sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renderiza inputs e botoes", () => {
    const wrapper = shallow(<Login {...props} />);

    expect(wrapper.find("input.username").length).toEqual(1);
    expect(wrapper.find("input.password").length).toEqual(1);
    expect(wrapper.find("button.btn-login").length).toEqual(1);
  });

  it("guarda valor digitado em username e password no state", () => {
    const wrapper = mount(<Login {...props} />);

    const inputUsername = wrapper.find("input.username");
    const inputPassword = wrapper.find("input.password");

    inputUsername.simulate("change", {
      target: { name: "username", value: "admin" }
    });
    inputPassword.simulate("change", {
      target: { name: "password", value: "123" }
    });

    const { login } = wrapper.state();

    expect(login.username).toEqual("admin");
    expect(login.password).toEqual("123");
  });

  it("mostra erro se tentar logar sem username ou password", done => {
    const wrapper = mount(<Login {...props} />);

    let state = wrapper.state();

    wrapper.find("button.btn-login").simulate("click");
    expect(state.error).toBeFalsy();

    setTimeout(() => {
      state = wrapper.state();
      expect(state.error).toBe(MESSAGES.FORM_ERROR);
      expect(wrapper.find(".login-error").length).toBe(1);
      done();
    });
  });

  it("mostra erro quando o servidor responde com falha de login", done => {
    const onAuthenticate = jest.fn();
    const wrapper = mount(<Login onAuthenticate={onAuthenticate} />);
    const inputUsername = wrapper.find("input.username");
    const inputPassword = wrapper.find("input.password");

    inputUsername.simulate("change", {
      target: { name: "username", value: "Error" }
    });
    inputPassword.simulate("change", {
      target: { name: "password", value: "123" }
    });

    wrapper.find("button.btn-login").simulate("click");
    setTimeout(() => {
      wrapper.update();
      const { error } = wrapper.state();
      expect(onAuthenticate).toHaveBeenCalledTimes(0);
      expect(wrapper.find(".login-error").length).toBe(1);
      expect(error).toBe(MESSAGES.REQUEST_ERROR);
      done();
    });
  });

  it("chama callback onAuthenticate quando clica em logar", done => {
    const onAuthenticate = jest.fn();
    const wrapper = mount(<Login onAuthenticate={onAuthenticate} />);
    const inputUsername = wrapper.find("input.username");
    const inputPassword = wrapper.find("input.password");

    inputUsername.simulate("change", {
      target: { name: "username", value: "admin" }
    });
    inputPassword.simulate("change", {
      target: { name: "password", value: "123" }
    });

    wrapper.find("button.btn-login").simulate("click");
    setTimeout(() => {
      expect(onAuthenticate).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
