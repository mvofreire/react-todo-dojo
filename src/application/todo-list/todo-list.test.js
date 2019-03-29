import React from "react";
import ReactDOM from "react-dom";
import { TodoListApp } from ".";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

describe("<TodoListApp /> Component", () => {
  let component = null;

  beforeEach(() => {
    component = <TodoListApp />;
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("App possui 1 component de Lista", () => {
    const wrapper = shallow(component);

    expect(wrapper.find("Lista").length).toEqual(1);
  });

  it("App possui 1 component Form ", () => {
    const wrapper = shallow(component);

    expect(wrapper.find("Form").length).toEqual(1);
  });

  it("Mostra mensagem de alerta quando não possui nenhum TODO", () => {
    const wrapper = shallow(component);

    expect(wrapper.find("span.todo-empty").length).toEqual(1);
  });

  it("Adiciona TODO ao clicar em Adicionar", () => {
    const wrapper = mount(component);

    const form = wrapper.find("Form").first();
    const input = form.find("input").first();
    const btnAdd = form.find("button.btn-add").first();

    expect(wrapper.find("Item").length).toEqual(0);

    input.simulate("change", { target: { value: "teste" } });
    btnAdd.simulate("click");

    input.simulate("change", { target: { value: "teste 2" } });
    btnAdd.simulate("click");

    input.simulate("change", { target: { value: "teste 3" } });
    btnAdd.simulate("click");

    expect(wrapper.find("Item").length).toEqual(3);
  });

  it("Adiciona TODO ao clicar em Adicionar & Remove ao clicar em X", () => {
    const wrapper = mount(component);

    const form = wrapper.find("Form").first();
    const input = form.find("input").first();
    const btnAdd = form.find("button.btn-add").first();

    //Adiciona 1 TODO
    expect(wrapper.find("Item").length).toEqual(0);
    input.simulate("change", { target: { value: "teste" } });
    btnAdd.simulate("click");

    expect(wrapper.find("Item").length).toEqual(1);

    //remove TODO
    const btnRemove = wrapper
      .find("Item")
      .first()
      .find("button.todo-remove")
      .first();
    btnRemove.simulate("click");
    expect(wrapper.find("Item").length).toEqual(0);
  });

  it("Altera TODO para completo quando clica no Botao Completar", () => {
    const wrapper = mount(component);

    const form = wrapper.find("Form").first();
    const input = form.find("input").first();
    const btnAdd = form.find("button.btn-add").first();

    //Adiciona 1 TODO
    expect(wrapper.find("Item").length).toEqual(0);
    input.simulate("change", { target: { value: "teste" } });
    btnAdd.simulate("click");
    expect(wrapper.find("Item").length).toEqual(1);

    //complete TODO
    const btnComplete = wrapper.find("button.todo-complete").first();
    btnComplete.simulate("click");
    const checked = wrapper.find("input.check-todo-complete").prop("checked");

    expect(checked).toBe(true);
    expect(btnComplete.instance().disabled).toBe(true);
  });

  it("Valida se tenta adicionar item com titulo duplicado", () => {
    const wrapper = mount(component);

    const form = wrapper.find("Form").first();
    const input = form.find("input").first();
    const btnAdd = form.find("button.btn-add").first();

    //Adiciona 1 TODO
    expect(wrapper.find("Item").length).toEqual(0);
    input.simulate("change", { target: { value: "teste" } });
    btnAdd.simulate("click");

    expect(wrapper.find("Item").length).toBe(1);

    input.simulate("change", { target: { value: "teste" } });
    btnAdd.simulate("click");
    expect(wrapper.find("span.erro-duplicado").length).toEqual(1);
    expect(wrapper.find("span.erro-duplicado").text()).toEqual(
      "Ja existe um TODO com o titulo duplicado!"
    );
  });

  it("App to match snapshot", () => {
    const wrapper = create(component);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
