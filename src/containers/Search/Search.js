import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { searchUser, clearError } from "./actions";

class Search extends React.Component {
  state = {
    nickname: ""
  };
  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
  }

  componentDidUpdate() {
    const { searchMessage, clearError, searchSuccess, t, history } = this.props;

    if (searchMessage) {
      alert(t("SEARCH.USER_NOT_FOUND"));
      clearError();
    }

    if (searchSuccess) {
      alert(t("SEARCH.REQUEST_SENT"));
      history.push("/rooms");
    }
  }

  handleValueChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  searchClicked = () => {
    const { nickname } = this.state;
    const data = {
      nickname: nickname
    };
    this.props.searchUser(data);
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
            {t("SEARCH.SEND_REQUEST")}
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged,
  searchMessage: state.search.message,
  searchSuccess: state.search.success
});

const mapDispatchToProps = dispatch => ({
  searchUser: data => dispatch(searchUser(data)),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Search));