import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logOut } from "../Login/actions";

class Rooms extends React.Component {
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
    const { t, isLogged } = this.props;

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
