import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { logIn, logInFromCookie, clearError } from "./actions";
import CONSTANTS from "../../helpers/constants";
import Logo from "../../images/logo.png";
import {
  LoginButton,
  FieldsWrapper,
  Field,
  Container,
  LogoWrapper,
  Error,
  RegisterWrapper,
  RegisterLink,
} from "./Login.styled";

class Login extends React.Component {
  state = {
    nickname: "",
    password: ""
  };
  cookies = new Cookies();

  componentDidMount() {
    const { isLogged, history, loginMessage, clearError, logInFromCookie } = this.props;
    if (isLogged) return history.push("/rooms");
    if (loginMessage) clearError();
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
    const { isLogged, loginMessage, t } = this.props;
    const { nickname, password } = this.state;

    return isLogged ? <div /> : (
      <Container>
        <LogoWrapper src={Logo} />
        <FieldsWrapper>
          <Field
            type="text"
            name="nickname"
            value={nickname}
            onChange={this.handleValueChange}
            placeholder="Nickname"
          />
          <Field
            type="password"
            name="password"
            value={password}
            onChange={this.handleValueChange}
            placeholder="Password"
          />
          <LoginButton onClick={this.loginClicked}>
            {t("LOGIN.LOG_IN")}
          </LoginButton>
        </FieldsWrapper>
        {loginMessage &&
          <Error>{t("LOGIN.ERROR")}</Error>
        }
        <RegisterWrapper>
          <span>{t("LOGIN.REGISTER.LABEL")}</span>
          <RegisterLink onClick={this.registerClicked}>
            {t("LOGIN.REGISTER.LINK")}
          </RegisterLink>
        </RegisterWrapper>
      </Container>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged,
  loginMessage: state.login.message
})

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(logIn(data)),
  logInFromCookie: () => dispatch(logInFromCookie()),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Login));