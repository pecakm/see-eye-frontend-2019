import React from "react";
import { connect } from "react-redux";

import LoginComponent from "./components/login/login";
import BlankComponent from "./components/BlankComponent";
import { logIn } from "./actions";

const App = ({ isLogged, logIn }) => (
  <>
    {isLogged ? (
      <BlankComponent />
    ) : (
      <LoginComponent loginCallback={logIn} />
    )}
  </>
);

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
