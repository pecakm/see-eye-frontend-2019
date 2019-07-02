import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import LoginContainer from "./containers/login/login";

it("renders without crashing", () => {
  shallow(<App />);
});

it("contains Login Container", () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<LoginContainer />)).toEqual(true);
});