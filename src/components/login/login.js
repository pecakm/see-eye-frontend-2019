import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { logIn } from "../../actions";

class LoginComponent extends React.Component {
  componentDidMount() {
    const { isLogged, history } = this.props;
    if (isLogged) history.push("/rooms");
  }

  loginClicked = () => {
    const { history, logIn } = this.props;
    history.push("/rooms");
    logIn();
  }; 

  render() {
    const { t, isLogged } = this.props;

    return isLogged ? <div /> : (
      <div>
        <input type="text" />
        <input type="password" />
        <button onClick={this.loginClicked}>
          {t("login")}
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LoginComponent));