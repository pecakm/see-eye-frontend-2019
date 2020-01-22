import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { clearError, registerUser } from "./actions";
import Logo from "../../images/logo.png";
import {
  Container,
  Title,
  LogoWrapper,
  FieldsWrapper,
  Field,
  RegisterButton,
  Error,
  LoginWrapper,
  LoginLink,
} from "./Register.styled";

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
      <Container>
        <LogoWrapper src={Logo} />
        <Title>{t("COMMON.TITLE")}</Title>
        <FieldsWrapper>
          <Field
            type="text"
            name="nickname"
            value={nickname}
            onChange={this.handleValueChange}
            placeholder="Nickname (must be unique!)"
          />
          <Field
            type="password"
            name="password"
            value={password}
            onChange={this.handleValueChange}
            placeholder="Password (min. 6 characters)"
          />
          <RegisterButton onClick={this.registerClicked}>
            {t("REGISTER.REGISTER")}
          </RegisterButton>
        </FieldsWrapper>
        {registerMessage &&
          <Error>{t("REGISTER.FAILURE")}</Error>
        }
        <LoginWrapper>
          <span>{t("REGISTER.LOG_IN.LABEL")}</span>
          <LoginLink onClick={this.loginClicked}>
            {t("REGISTER.LOG_IN.LINK")}
          </LoginLink>
        </LoginWrapper>
      </Container>
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