import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";

import "./index.css";
import RoomsContainer from "./containers/Rooms/Rooms";
import LoginComponent from "./containers/Login/Login";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LoginComponent} />
        <Route exact path="/rooms" component={RoomsContainer} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
