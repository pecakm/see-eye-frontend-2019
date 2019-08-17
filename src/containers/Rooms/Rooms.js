import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Rooms extends React.Component {
  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
  }

  startConversation = () => {
    const { history } = this.props;
    history.push("/chat");
  };
  
  render() {
    const { t, isLogged } = this.props;

    return !isLogged ? <div /> : (
      <div>
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

export default withRouter(connect(mapStateToProps)(withTranslation()(Rooms)));
