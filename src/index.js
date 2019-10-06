import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";

import "./index.css";
import Rooms from "./containers/Rooms/Rooms";
import Login from "./containers/Login/Login";
import Chat from "./containers/Chat/Chat";
import Search from "./containers/Search/Search";
import Register from "./containers/Register/Register";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import store from "./store";

require("dotenv").config();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/chat/:id" component={Chat} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
