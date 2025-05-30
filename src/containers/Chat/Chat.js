import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import io from "socket.io-client";
import CryptoJS from "crypto-js";
import NodeRSA from "node-rsa";

import { loadChatData } from "../../apiRequests";
import Logo from "../../images/logo.png";
import {
  Menu,
  LogoWrapper,
  ChatsListButton,
  ContactNameWrapper,
  ContactName,
  InputWrapper,
  Field,
  SendButton,
  ChatWrapper,
  Message,
} from "./Chat.styled";

class Chat extends React.Component {
  state = {
    nickname: "",
    roomId: null,
    chatItems: [],
    chatInput: "",
    chatKey: "",
    sendingDisabled: true
  };
  socket = null;
  rsa = null;

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
    this.socket = io(process.env.REACT_APP_API);
    this.socket.on("connect", () => {
      this.socket.emit("chat_room", roomId);
    });
    this.socket.on("chat_online", () => {
      this.rsa = new NodeRSA({ b: 512 });
      this.rsa.generateKeyPair();
      this.socket.emit("chat_key", {
        publicKey: this.rsa.exportKey("public"),
        roomId
      });
    });
    this.socket.on("chat_key", publicKey => {
      const { chatItems, nickname } = this.state;
      this.setState({
        chatKey: Math.random().toString(),
        chatItems: chatItems.concat({
          text: `Użytkownik ${nickname} jest online`
        }),
        sendingDisabled: false
      }, () => this.sendChatKey(publicKey));
    });
    this.socket.on("chat_key2", encryptedKey => this.getChatKey(encryptedKey));
    this.socket.on("chat_message", data => this.getAnswer(data));
  }

  sendChatKey = publicKey => {
    const { roomId, chatKey } = this.state;
    this.rsa = new NodeRSA(publicKey);

    this.socket.emit("chat_key2", {
      encryptedKey: this.rsa.encrypt(chatKey, "base64"),
      roomId
    });
  };

  getChatKey = encryptedKey => {
    const { chatItems, nickname } = this.state;
    const chatKey = this.rsa.decrypt(encryptedKey, "utf8");
    this.setState({
      chatKey,
      chatItems: chatItems.concat({
        text: `Użytkownik ${nickname} jest online`
      }),
      sendingDisabled: false,
    });
  };

  getAnswer = data => {
    const { chatItems, chatKey, nickname } = this.state;
    const decryptedData = CryptoJS.AES.decrypt(data.text.toString(), chatKey);
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
    const { chatInput, chatItems, roomId, chatKey } = this.state;
    this.socket.emit("chat_message", {
      roomId,
      message: {
        text: CryptoJS.AES.encrypt(chatInput, chatKey).toString()
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

    const messages = [...chatItems].reverse();

    return !isLogged || !nickname ? <div /> : (
      <div>
        <Menu>
          <LogoWrapper src={Logo} />
          <ChatsListButton onClick={this.goToRooms}>
            {t("CHAT.CHAT_LIST")}
          </ChatsListButton>
        </Menu>
        {nickname && (
          <ContactNameWrapper>
            <small>{t("CHAT.CHAT_WITH")}</small> <ContactName>{nickname}</ContactName>
          </ContactNameWrapper>
        )}
        <InputWrapper>
          <Field
            type="text"
            placeholder={t("CHAT.WRITE_HERE")}
            name="chatInput"
            value={chatInput}
            onChange={this.handleValueChange}
          />
          <SendButton onClick={this.sendMessage} disabled={sendingDisabled}>
            {t("CHAT.SEND_MESSAGE")}
          </SendButton>
        </InputWrapper>
        <ChatWrapper>
          {messages.map((item, index) => (
            <Message key={index}
              isSender={item.user === "You"}
              isReceiver={item.user && item.user !== "You"}
            >
              {item.user && `${item.user}: `}{item.text}
            </Message>
          ))}
        </ChatWrapper>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(withTranslation()(Chat));