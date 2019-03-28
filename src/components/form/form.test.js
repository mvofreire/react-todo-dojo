import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { stub } from "sinon";
import { create } from "react-test-renderer";

import { Form, ENTER_CODE, ESC_CODE, MESSAGES } from ".";

describe("Component Form - <Form/>", () => {
  it("Component <Form/> renderiza sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Form />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Component <Form/> limpa input quando clica em Limpar", () => {
    const wrapper = mount(<Form />);
    const input = wrapper.find("input");

    //Espera que valor de input seja vazio
    expect(input.instance().value).toBe("");

    //digita algum valor no input
    input.simulate("change", { target: { value: "foo" } });

    //valida se valor digitado
    expect(input.instance().value).toBe("foo");

    //busca botao de LIMPAR
    //clica no Botao Limpar
    const btnLimpar = wrapper.find("button.btn-clear").first();
    btnLimpar.simulate("click");

    //valida se input foi limpo
    expect(input.props().value).toBe("");
    expect(input.is(":focus")).toBe(true);
  });

  it("Valida se titulo foi digitado quando tenta adicionar TODO", () => {
    const wrapper = mount(<Form />);
    const btnAdd = wrapper.find("button.btn-add").first();
    btnAdd.simulate("click"); //Tenta adicionar TODO sem valor de titulo
    expect(wrapper.find("span.error").length).toEqual(1);
    expect(wrapper.find("span.error").text()).toContain(MESSAGES.ERROR_TITULO);
  });

  it("Valida se Bloqueia Adição com prop canAdd = false", () => {
    const wrapper = mount(<Form canAdd={false} />);
    const btnAdd = wrapper.find("button.btn-add").first();
    const input = wrapper.find("input");
    let state = wrapper.state();

    expect(state.error).toBeFalsy();
    input.simulate("change", { target: { value: "foo" } });
    btnAdd.simulate("click");

    state = wrapper.state();
    expect(state.error).toBeTruthy();
    expect(wrapper.find("span.error").text()).toContain(MESSAGES.ERROR_TITULO);
  });

  it("Valida se Botao ADD aparece", () => {
    const wrapper = create(<Form />);
    expect(wrapper.toJSON()).toMatchSnapshot("pode adicionar");
  });

  it("Valida se Botao ADD não aparece", () => {
    const wrapper = create(<Form canAdd={false} />);
    expect(wrapper.toJSON()).toMatchSnapshot("nao pode adicionar");
  });

  it("Valida se erro é apagado apos começar a digitar novamente", () => {
    const wrapper = mount(<Form />);
    const btnAdd = wrapper.find("button.btn-add").first();
    const input = wrapper.find("input");

    expect(input.instance().value).toBe("");

    //Tenta adicionar TODO sem valor de titulo
    btnAdd.simulate("click");
    expect(wrapper.find("span.error").length).toEqual(1);

    //digita um valor no titulo
    input.simulate("change", { target: { value: "foo" } });
    expect(wrapper.find("span.error").length).toEqual(0);
  });

  it("Valida se erro é apagado apos clicar em limpar", () => {
    const wrapper = mount(<Form />);
    const btnAdd = wrapper.find("button.btn-add").first();
    const btnClear = wrapper.find("button.btn-clear").first();
    const input = wrapper.find("input");

    expect(input.instance().value).toBe("");

    //Tenta adicionar TODO sem valor de titulo
    btnAdd.simulate("click");
    expect(wrapper.find("span.error").length).toEqual(1);

    //digita um valor no titulo
    btnClear.simulate("click");
    expect(wrapper.find("span.error").length).toEqual(0);
  });

  it("Component <Form/> Chama callback quando clica em Adicionar", () => {
    const onCreate = stub();
    const wrapper = mount(<Form onCreate={onCreate} />);
    const input = wrapper.find("input");

    input.simulate("change", { target: { value: "foo" } });
    wrapper.find("button.btn-add").simulate("click");
    expect(onCreate.callCount).toEqual(1);
    expect(input.instance().value).toBe("");
    expect(input.is(":focus")).toBe(true);
  });

  it("<Form/> Match Snapshoot", () => {
    const wrapper = create(<Form />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it("Seta o foco no input quando renderiza", () => {
    const wrapper = mount(<Form />);
    const input = wrapper.find("input");

    expect(input.is(":focus")).toBe(true);
  });

  it(`Quando pressionar ENTER (KeyCode ${ENTER_CODE}) deve tentar adicionar novo TODO`, () => {
    const onCreate = stub();
    const wrapper = mount(<Form onCreate={onCreate} />);
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "foo" } });
    input.simulate("keyup", { keyCode: ENTER_CODE });

    expect(onCreate.callCount).toEqual(1);
    expect(input.instance().value).toBe("");
    expect(input.is(":focus")).toBe(true);
  });

  it(`Quando pressionar ESC (KeyCode ${ESC_CODE}) deve limpar input`, () => {
    const wrapper = mount(<Form />);
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "foo" } });
    input.simulate("keyup", { keyCode: ESC_CODE });
    expect(input.instance().value).toBe("");
    expect(input.is(":focus")).toBe(true);
  });
});
