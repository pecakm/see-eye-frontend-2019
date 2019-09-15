import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { loadChatData } from "../../apiRequests";

class Chat extends React.Component {
  state = { nickname: "" };

  componentDidMount() {
    const { isLogged, history, match } = this.props;

    if (!isLogged) {
      history.push("/");
    } else {
      loadChatData(match.params.id).then(
        nickname => this.setState({ nickname })
      );
    }
  }

  goToRooms = () => {
    const { history } = this.props;
    history.push("/rooms");
  };

  render() {
    const { isLogged, t } = this.props;
    const { nickname } = this.state;

    return !isLogged ? <div /> : (
      <div>
        <div>
          <button onClick={this.goToRooms}>
            {t("CHAT.CHAT_LIST")}
          </button>
        </div>
        <div>
          {nickname}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(withTranslation()(Chat));