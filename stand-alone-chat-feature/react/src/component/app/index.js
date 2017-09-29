import React from 'react';
import {connect} from 'react-redux';

import './_app.scss';
import * as util from '../../lib/util.js';
import * as authActions from '../../action/auth-action.js';

import AuthForm from '../auth-form';
import Modal from '../modal';
import ChatBar from '../chat-components/chat-bar';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupToggle: false,
      loginToggle: false
    }
    this.loginModal = this.loginModal.bind(this);
    this.signupModal = this.signupModal.bind(this);
  }

  loginModal() {
    let loginToggle = this.state.loginToggle === false;
    this.setState({loginToggle});
  }
  signupModal() {
    let signupToggle = this.state.signupToggle === false;
    this.setState({signupToggle});
  }

  render() {
    return(
      <section>
      {util.renderIf(this.state.signupToggle,
        <Modal
          close={this.signupModal}
        >
          <AuthForm
            onComplete={this.props.signupRequest}
            auth='signup'
            close={this.signupModal}
          />
        </ Modal>
      )}
      {util.renderIf(this.state.loginToggle,
        <Modal
          close={this.loginModal}
        >
          <AuthForm
            onComplete={this.props.loginRequest}
            auth='login'
            close={this.loginModal}
          />
        </ Modal>
      )}
        <button onClick={this.loginModal}>Login</button>
        <button onClick={this.signupModal}>Sign Up</button>
        {util.renderIf(this.props.token && this.props.profile,
          <ChatBar />
        )}
      </section>
    )
  }
}

let mapStateToProps = state => ({
  token: state.token,
  profile: state.profile
})

let mapDispatchToProps = dispatch => ({
  loginRequest: user =>  dispatch(authActions.loginRequest(user)),
  signupRequest: user => dispatch(authActions.signupRequest(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
