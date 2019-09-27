import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import io from "socket.io-client";
import CryptoJS from "crypto-js";

import { loadChatData } from "../../apiRequests";
import CONSTANTS from "../../helpers/constants";

class Chat extends React.Component {
  state = {
    nickname: "",
    roomId: null,
    chatItems: [],
    chatInput: "",
    key: ""
  };
  socket = null;

  componentDidMount() {
    const { isLogged, history, match } = this.props;

    if (!isLogged) {
      history.push("/");
    } else {
      loadChatData(match.params.id).then(room => {
        this.setState({
          nickname: room.nickname,
          roomId: room.id
        });
        this.connectToSocket();
      });
    }
  }

  connectToSocket() {
    const { roomId } = this.state;
    this.socket = io(CONSTANTS.API);
    this.socket.on("connect", () => {
      this.socket.emit("chat_room", roomId);
      this.setState({ key: Math.random().toString() });
    });
    this.socket.on("chat_key", key => (
      this.setState({ key })
    ));
    this.socket.on("chat_online", () => {
      this.socket.emit("chat_key", { key: this.state.key, roomId });
      this.showUserOnline();
    });
    this.socket.on("chat_message", data => (
      this.getAnswer(data)
    ));
  }

  showUserOnline = () => {
    const { chatItems, nickname } = this.state;
    this.setState({
      chatItems: chatItems.concat(`Użytkownik ${nickname} jest online`)
    });
  };

  getAnswer = data => {
    const { chatItems, key } = this.state;
    const decryptedData = CryptoJS.AES.decrypt(data.toString(), key);
    const message = decryptedData.toString(CryptoJS.enc.Utf8);
    this.setState({
      chatItems: chatItems.concat(message)
    });
  };

  goToRooms = () => {
    const { history } = this.props;
    this.socket.disconnect();
    history.push("/rooms");
  };

  sendMessage = () => {
    const { chatInput, roomId, key } = this.state;
    this.socket.emit("chat_message", {
      roomId,
      message: CryptoJS.AES.encrypt(chatInput, key).toString()
    });
    this.updateConversation(chatInput, this.clearInput);
  };

  updateConversation = (data, callback) => {
    const { chatItems } = this.state;
    this.setState({
      chatItems: chatItems.concat(data)
    }, callback);
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
        <p>
          {nickname}
        </p>
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