import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Rooms extends React.Component {
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
}

const mapStateToProps = state => ({
  isLogged: state.login.isLogged
});

export default withRouter(connect(mapStateToProps)(Rooms));
