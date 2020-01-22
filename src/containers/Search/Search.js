import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { searchUser } from "../../apiRequests";
import Logo from "../../images/logo.png";
import {
  Menu,
  LogoWrapper,
  ChatsListButton,
  SearchWrapper,
  Field,
  SearchButton,
} from "./Search.styled";

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
        <Menu>
          <LogoWrapper src={Logo} />
          <ChatsListButton onClick={this.goToChatList}>
            {t("SEARCH.CHAT_LIST")}
          </ChatsListButton>
        </Menu>
        <SearchWrapper>
          <Field
            type="text"
            name="nickname"
            value={nickname}
            onChange={this.handleValueChange}
            placeholder="Type a nickname to find..."
          />
          <SearchButton onClick={this.searchClicked}>
            {t("SEARCH.START_CHAT")}
          </SearchButton>
        </SearchWrapper>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(withTranslation()(Search));