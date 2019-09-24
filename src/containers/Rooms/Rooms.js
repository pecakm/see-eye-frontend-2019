import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { logOut } from "../Login/actions";
import { loadRooms } from "../../apiRequests";

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
        <div>
          <button onClick={this.logout}>
            {t("ROOMS.LOG_OUT")}
          </button>
        </div>
        <div>
          <button onClick={this.searchUser}>
            {t("ROOMS.SEARCH_USER")}
          </button>
        </div>
        <div>
          <h3>
            {t("ROOMS.CONTACTS")}
          </h3>
          {rooms.map((room, index) => (
            <button key={index} onClick={() => this.goChat(room._id)}>
              {room.nickname}
            </button>
          ))}
        </div>
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
