import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import socketIOClient from "socket.io-client";

import { loadChatData } from "../../apiRequests";

class Chat extends React.Component {
  state = {
    nickname: "",
    response: false,
    endpoint: "http://127.0.0.1:3100/chat"
  };

  componentDidMount() {
    const { isLogged, history, match } = this.props;

    if (!isLogged) {
      history.push("/");
    } else {
      loadChatData(match.params.id).then(
        nickname => this.setState({ nickname })
      );
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("FromAPI", data => this.setState({ response: data }));
    }
  }

  goToRooms = () => {
    const { history } = this.props;
    history.push("/rooms");
  };

  render() {
    const { isLogged, t } = this.props;
    const { nickname, response } = this.state;

    return !isLogged || !nickname ? <div /> : (
      <div>
        <div>
          <button onClick={this.goToRooms}>
            {t("CHAT.CHAT_LIST")}
          </button>
        </div>
        <div>
          {nickname}
        </div>
        <div>
          Response: {response}
        </div>
        <div>
          <input placeholder={t("CHAT.INPUT_PLACEHOLDER")} />
          <button onClick={this.goToRooms}>
            {t("CHAT.SEND_MESSAGE")}
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(withTranslation()(Chat));