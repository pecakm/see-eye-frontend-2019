import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { logOut } from "../Login/actions";

class Rooms extends React.Component {
  cookies = new Cookies();

  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
  }

  logout = () => {
    const { history, logOut } = this.props;
    logOut();
    history.push("/");
  };

  searchUser = () => {
    const { history } = this.props;
    history.push("/search");
  };

  startConversation = () => {
    const { history } = this.props;
    history.push("/chat");
  };
  
  render() {
    const { isLogged, t } = this.props;

    return !isLogged ? <div /> : (
      <div>
        <div>
          <button onClick={this.logout}>
            {t("ROOMS.LOG_OUT")}
          </button>
        </div>
        <div>
          <button onClick={this.searchUser}>
            {t("ROOMS.SEARCH_USER")}
          </button>
        </div>
        <button onClick={this.startConversation}>
          {t("ROOMS.START_CHAT")}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Rooms)));
