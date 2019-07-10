import React from "react";
import { withTranslation } from "react-i18next";

class LoginComponent extends React.Component {
  onLoginClick() {
    this.props.loginCallback();
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <input type="text" />
        <input type="password" />
        <button onClick={() => this.onLoginClick()}>
          {t("login")}
        </button>
      </div>
    );
  }
};

export default withTranslation()(LoginComponent);