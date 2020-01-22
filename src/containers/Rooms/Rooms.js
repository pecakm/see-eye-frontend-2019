import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { logOut } from "../Login/actions";
import { loadRooms } from "../../apiRequests";
import Logo from "../../images/logo.png";
import {
  Menu,
  LogoWrapper,
  MenuButtons,
  LogoutButton,
  SearchButton,
  ContactsWrapper,
  ContactButton,
} from "./Rooms.styled";

class Rooms extends React.Component {
  state = { rooms: [] };
  cookies = new Cookies();

  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
    loadRooms().then(rooms => this.setState({ rooms }));
  }

  logout = () => {
    const { history, logOut } = this.props;
    logOut();
    history.push("/");
  };

  searchUser = () => {
    const { history } = this.props;
    history.push("/search");
  };

  goChat = userId => {
    const { history } = this.props;
    history.push(`/chat/${userId}`);
  }
  
  render() {
    const { isLogged, t } = this.props;
    const { rooms } = this.state;

    return !isLogged ? <div /> : (
      <div>
        <Menu>
          <LogoWrapper src={Logo} />
          <MenuButtons>
            <SearchButton onClick={this.searchUser}>
              {t("ROOMS.SEARCH_USER")}
            </SearchButton>
            <LogoutButton onClick={this.logout}>
              {t("ROOMS.LOG_OUT")}
            </LogoutButton>
          </MenuButtons>
        </Menu>
        <ContactsWrapper>
          <h3>
            {t("ROOMS.CONTACTS")}
          </h3>
          {rooms.map((room, index) => (
            <ContactButton key={index} onClick={() => this.goChat(room._id)}>
              {room.nickname}
            </ContactButton>
          ))}
        </ContactsWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Rooms)));
