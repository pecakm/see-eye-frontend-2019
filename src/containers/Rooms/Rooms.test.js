import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import ConnectedApp from "./App";
import LoginContainer from "./components/login/login";

describe("App Component", () => {
  const mockStore = configureStore();
  let state = { login: { isLogged: false } };
  let component, store;

  beforeEach(() => {
    store = mockStore(state);
    component = mount(<ConnectedApp store={store} />);
  });

  it("renders without crashing", () => {
    expect(component.length).toEqual(1);
  });
  
  it("contains Login Container on start", () => {
    expect(component.containsMatchingElement(<LoginContainer />)).toEqual(true);
  });

  it("doesn't show Login Container after login", () => {
    state = { login: { isLogged: true } };
    store = mockStore(state);
    component = mount(<ConnectedApp store={store} />);
    expect(component.containsMatchingElement(<LoginContainer />)).toEqual(false);
  });
});