import React from "react";
import { connect } from "react-redux";

class Chat extends React.Component {
  componentDidMount() {
    const { isLogged, history } = this.props;
    if (!isLogged) history.push("/");
  }

  render() {
    const { isLogged } = this.props;

    return !isLogged ? <div /> : (
      <div>
        Hello
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(Chat);