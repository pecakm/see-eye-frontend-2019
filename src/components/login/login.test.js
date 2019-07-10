import React from "react";
import { mount } from "enzyme";

import LoginComponent from "./login";

describe("Login Component", () => {
  let component;

  beforeEach(() => {
    component = mount(<LoginComponent />);
  });

  it("renders without crashing", () => {
    expect(component.length).toEqual(1);
  });
  
  it("contains Login field", () => {
    expect(component.containsMatchingElement(<input type="text" />)).toEqual(true);
  });
  
  it("contains Password field", () => {
    expect(component.containsMatchingElement(<input type="password" />)).toEqual(true);
  });
  
  it("contains Login button", () => {
    expect(component.containsMatchingElement(<button>login</button>)).toEqual(true);
  });
});