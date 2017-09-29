import React from 'react';
import {connect} from 'react-redux';

import './_chat-bar.scss';
import ChatWindow from '../chat-window';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleQueue: [],
      hiddenQueue: [],
      chatClass: 'chat-window-hidden',
    }
    this.toggleChatWindow = this.toggleChatWindow.bind(this);
  }

  toggleChatWindow () {
    let chatClass = this.state.chatClass === 'chat-window' ?
    'chat-window-hidden':
    'chat-window';
    this.setState({chatClass});
  }

  render() {
    return(
      <section className='chat-bar'>
        <div className='hidden-queue'>
          <ul>
          </ul>
        </div>
        <ul className='visible-queue'>
        </ul>
        <ChatWindow
          className={this.state.chatClass}
          onClick={this.toggleChatWindow}
        />
      </section>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  token: state.token
})

let mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
