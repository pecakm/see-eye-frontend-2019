import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import io from "socket.io-client";

import { loadChatData } from "../../apiRequests";
import CONSTANTS from "../../helpers/constants";

class Chat extends React.Component {
  state = {
    nickname: "",
    roomId: null,
    chatItems: [],
    chatInput: ""
  };
  socket = null;

  componentDidMount() {
    const { isLogged, history, match } = this.props;

    if (!isLogged) {
      history.push("/");
    } else {
      loadChatData(match.params.id).then(room => {
        this.setState({
          nickname: room.users.find(item => item === match.params.id),
          roomId: room._id
        });
        this.connectToSocket();
      });
    }
  }

  connectToSocket() {
    const { roomId } = this.state;
    this.socket = io(CONSTANTS.API);
    this.socket.on("connect", () => (
      this.socket.emit("room", roomId)
    ));
    this.socket.on("chat_message", data => (
      this.updateConversation(data)
    ));
  }

  updateConversation = (data, callback) => {
    const { chatItems } = this.state;
    this.setState({
      chatItems: chatItems.concat(data)
    }, callback);
  };

  goToRooms = () => {
    const { history } = this.props;
    this.socket.disconnect();
    history.push("/rooms");
  };

  sendMessage = () => {
    const { chatInput, roomId } = this.state;
    this.socket.emit("chat_message", {
      room: roomId,
      message: chatInput
    });
    this.updateConversation(chatInput, this.clearInput);
  };

  clearInput = () => this.setState({ chatInput: "" });

  handleValueChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isLogged, t } = this.props;
    const { nickname, chatItems, chatInput } = this.state;

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
          {chatItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder={t("CHAT.WRITE_HERE")}
            name="chatInput"
            value={chatInput}
            onChange={this.handleValueChange}
          />
          <button onClick={this.sendMessage}>
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