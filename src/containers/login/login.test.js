import React from "react";
import { shallow } from "enzyme";
import LoginContainer from "./login";

it("renders without crashing", () => {
  shallow(<LoginContainer />);
});

it("contains Login field", () => {
  const app = shallow(<LoginContainer />);
  expect(app.containsMatchingElement(<input type="text" />)).toEqual(true);
});

it("contains Password field", () => {
  const app = shallow(<LoginContainer />);
  expect(app.containsMatchingElement(<input type="password" />)).toEqual(true);
});

it("contains Login button", () => {
  const app = shallow(<LoginContainer />);
  expect(app.containsMatchingElement(
    <button>
      
    </button>
  )).toEqual(true);
});