import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { Item } from ".";
import { stub } from "sinon";
import { create } from "react-test-renderer";

describe("Testando Component <Item />", () => {
  const props = {
    titulo: "Teste",
    color: "red",
    onComplete: jest.fn,
    onRemove: jest.fn
  };

  it("Renderiza Item sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Item {...props} titulo="Teste" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Component <Item/> Chama callback quando clica em Remover", () => {
    const onRemove = stub();

    const wrapper = shallow(<Item {...props} onRemove={onRemove} />);
    wrapper.find("button.todo-remove").simulate("click");
    expect(onRemove.callCount).toEqual(1);
  });

  it("Component <Item/> Chama callback quando clica em Completar TODO", () => {
    const onComplete = stub();
    const wrapper = shallow(<Item {...props} onComplete={onComplete} />);
    wrapper.find("button.todo-complete").simulate("click");
    expect(onComplete.callCount).toEqual(1);
  });

  it("Check é Marcado quando Item esta completo", () => {
    const wrapper = shallow(<Item {...props} complete={true} />);
    const check = wrapper.find("input[type='checkbox']").prop("checked");
    expect(check).toEqual(true);
  });

  it("Valida Snapshot de Item completo", () => {
    const wrapper = create(<Item {...props} complete={true} />);
    expect(wrapper.toJSON()).toMatchSnapshot("completo")
  });

  it("Item Component to match snapshot", () => {
    const wrapper = create(<Item {...props} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
