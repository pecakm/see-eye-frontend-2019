import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { clearError, registerUser } from "./actions";

class Register extends React.Component {
  state = {
    nickname: "",
    password: ""
  };

  componentDidMount() {
    const { isLogged, history, registerMessage, clearError } = this.props;
    if (isLogged) return history.push("/rooms");
    if (registerMessage) clearError();
  }

  componentDidUpdate() {
    const { registerSuccess, t, history } = this.props;

    if (registerSuccess) {
      alert(t("REGISTER.SUCCESS"));
      history.push("/");
    }
  }

  handleValueChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  registerClicked = () => {
    const { nickname, password } = this.state;
    const data = {
      nickname: nickname,
      password: password
    };
    this.props.registerUser(data);
  };

  loginClicked = () => {
    const { history } = this.props;
    history.push("/");
  }

  render() {
    const { t, isLogged, registerMessage } = this.props;
    const { nickname, password } = this.state;

    return isLogged ? <div /> : (
      <div>
        <div>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={this.handleValueChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleValueChange}
          />
          <button onClick={this.registerClicked}>
            {t("REGISTER.REGISTER")}
          </button>
        </div>
        {registerMessage &&
          <p>{t("REGISTER.FAILURE")}</p>
        }
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
  isLogged: state.login.isLogged,
  registerSuccess: state.register.success,
  registerMessage: state.register.message
});

const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data)),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Register));