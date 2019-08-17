import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

class Search extends React.Component {
  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
  }

  findUser = () => {
    const { history } = this.props;
    history.push("/chat");
  };

  render() {
    const { isLogged, t } = this.props;

    return !isLogged ? <div /> : (
      <div>
        <input type="text" />
        <button onClick={this.findUser}>
          {t("SEARCH.SEARCH")}
        </button>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(withTranslation()(Search));