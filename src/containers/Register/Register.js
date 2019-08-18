import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { logIn } from "../Login/actions";

class Register extends React.Component {
  componentDidMount() {
    const { isLogged, history } = this.props;
    if (isLogged) history.push("/rooms");
  }

  registerClicked = () => {
    const { history, logIn } = this.props;
    logIn();
    history.push("/rooms");
  };

  loginClicked = () => {
    const { history } = this.props;
    history.push("/");
  }

  render() {
    const { t, isLogged } = this.props;

    return isLogged ? <div /> : (
      <div>
        <div>
          <input type="text" />
          <input type="password" />
          <button onClick={this.registerClicked}>
            {t("REGISTER.REGISTER")}
          </button>
        </div>
        <div>
          <button onClick={this.loginClicked}>
            {t("REGISTER.LOG_IN")}
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Register));