import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { searchUser } from "../../apiRequests";

class Search extends React.Component {
  state = { nickname: "" };

  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
  }

  handleValueChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  searchClicked = () => {
    const { t, history } = this.props;
    const { nickname } = this.state;
    const data = { nickname };

    searchUser(data).then(
      id => history.push(`/chat/${id}`)
    ).catch(() => alert(t("SEARCH.USER_NOT_FOUND")));
  };

  goToChatList = () => {
    const { history } = this.props;
    history.push("/rooms");
  };

  render() {
    const { isLogged, t } = this.props;
    const { nickname } = this.state;

    return !isLogged ? <div /> : (
      <div>
        <div>
          <button onClick={this.goToChatList}>
            {t("SEARCH.CHAT_LIST")}
          </button>
        </div>
        <div>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={this.handleValueChange}
          />
          <button onClick={this.searchClicked}>
            {t("SEARCH.START_CHAT")}
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(withTranslation()(Search));