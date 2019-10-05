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
    key: "",
    sendingDisabled: true
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
      this.setState({
        key: Math.random().toString()
      });
    });
    this.socket.on("chat_key", ({ key }) => {
      this.setState({ key });
      this.setUserOnline();
    });
    this.socket.on("chat_online", () => {
      this.socket.emit("chat_key", {
        key: this.state.key,
        roomId
      });
      this.setUserOnline();
    });
    this.socket.on("chat_message", data => (
      this.getAnswer(data)
    ));
  }

  setUserOnline = () => {
    const { chatItems, nickname } = this.state;
    this.setState({
      chatItems: chatItems.concat({
        text: `Użytkownik ${nickname} jest online`
      }),
      sendingDisabled: false
    });
  };

  getAnswer = data => {
    const { chatItems, key, nickname } = this.state;
    const decryptedData = CryptoJS.AES.decrypt(data.text.toString(), key);
    const message = decryptedData.toString(CryptoJS.enc.Utf8);
    this.setState({
      chatItems: chatItems.concat({
        text: message,
        user: nickname
      })
    });
  };

  goToRooms = () => {
    const { history } = this.props;
    this.socket.disconnect();
    history.push("/rooms");
  };

  sendMessage = () => {
    const { chatInput, chatItems, roomId, key } = this.state;
    this.socket.emit("chat_message", {
      roomId,
      message: {
        text: CryptoJS.AES.encrypt(chatInput, key).toString()
      }
    });
    this.setState({
      chatItems: chatItems.concat({
        text: chatInput,
        user: "You"
      }),
      chatInput: ""
    });
  };

  handleValueChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isLogged, t } = this.props;
    const { nickname, chatItems, chatInput, sendingDisabled } = this.state;

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
            <div key={index}>{item.user && `${item.user}: `}{item.text}</div>
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
          <button onClick={this.sendMessage} disabled={sendingDisabled}>
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