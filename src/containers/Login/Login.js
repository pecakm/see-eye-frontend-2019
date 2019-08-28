import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { logIn, logInFromCookie } from "./actions";
import { CONSTANTS } from "../../helpers/constants";

class Login extends React.Component {
  state = {
    nickname: "",
    password: ""
  };
  cookies = new Cookies();

  componentDidMount() {
    const { isLogged, history, logInFromCookie } = this.props;
    if (isLogged) return history.push("/rooms");
    if (this.cookies.get(CONSTANTS.TOKEN)) logInFromCookie();
  }

  componentDidUpdate() {
    const { isLogged, history } = this.props;
    if (isLogged) history.push("/rooms");
  }

  handleValueChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  loginClicked = () => {
    const { nickname, password } = this.state;
    const data = {
      nickname: nickname,
      password: password
    };
    this.props.logIn(data);
  };

  registerClicked = () => {
    const { history } = this.props;
    history.push("/register");
  }

  render() {
    const { isLogged, t } = this.props;

    return isLogged ? <div /> : (
      <div>
        <div>
          <input
            type="text"
            name="nickname"
            value={this.state.nameValue}
            onChange={this.handleValueChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.passwordValue}
            onChange={this.handleValueChange}
          />
          <button onClick={this.loginClicked}>
            {t("LOGIN.LOG_IN")}
          </button>
        </div>
        <div>
          <button onClick={this.registerClicked}>
            {t("LOGIN.REGISTER")}
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
})

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(logIn(data)),
  logInFromCookie: () => dispatch(logInFromCookie())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Login));