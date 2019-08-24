import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

class Chat extends React.Component {
  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
  }

  goToRooms = () => {
    const { history } = this.props;
    history.push("/rooms");
  };

  render() {
    const { t, isLogged } = this.props;

    return !isLogged ? <div /> : (
      <div>
        <div>
          <button onClick={this.goToRooms}>
            {t("CHAT.CHAT_LIST")}
          </button>
        </div>
        <div>
          Hello
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(withTranslation()(Chat));