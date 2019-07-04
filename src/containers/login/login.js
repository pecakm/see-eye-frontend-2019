import React from "react";
import { withTranslation } from "react-i18next";

const LoginContainer = ({ t }) => {
  return (
    <div>
      <input type="text" />
      <input type="password" />
      <button>
        {t("login")}
      </button>
    </div>
  );
};

export default withTranslation()(LoginContainer);