import React from "react";
import { translate } from "react-i18next";

const LoginContainer = ({ t }) => (
  <div>
    <input type="text" />
    <input type="password" />
    <button>
      {t("login")}
    </button>
  </div>
);

export default LoginContainer;