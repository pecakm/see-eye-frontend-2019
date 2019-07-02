import React from "react";
import { shallow } from "enzyme";
import LoginContainer from "./login";

it("renders without crashing", () => {
  shallow(<LoginContainer />);
});