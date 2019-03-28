import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import { Lista } from ".";

describe("Testando Component <Lista /> e <Item />", () => {
  it("Renderiza Lista sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Lista />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Valida se renderiza todos os Filhos", () => {
    const wrapper = shallow(<Lista>Teste de children</Lista>);
    expect(wrapper.text()).toContain("Teste de children");
  });

  it("Item Component to match snapshot", () => {
    const wrapper = create(<Lista />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
