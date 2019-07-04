import React from "react";
import { shallow, mount } from "enzyme";

import LoginContainer from "./login";

it("renders without crashing", () => {
  shallow(<LoginContainer />);
});

it("contains Login field", () => {
  const app = mount(<LoginContainer />);
  expect(app.containsMatchingElement(<input type="text" />)).toEqual(true);
});

it("contains Password field", () => {
  const app = mount(<LoginContainer />);
  expect(app.containsMatchingElement(<input type="password" />)).toEqual(true);
});

it("contains Login button", () => {
  const app = mount(<LoginContainer />);
  expect(app.containsMatchingElement(<button>login</button>)).toEqual(true);
});