import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";

import "./index.css";
import Rooms from "./containers/Rooms/Rooms";
import Login from "./containers/Login/Login";
import Chat from "./containers/Chat/Chat";
import Search from "./containers/Search/Search";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/search" component={Search} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
