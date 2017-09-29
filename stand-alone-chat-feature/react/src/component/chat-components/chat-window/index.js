import React from 'react';

import './_chat-window.scss';
import ChatForm from '../chat-form';
import Modal from '../../modal';

import * as util from '../../../lib/util.js';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    }

    this.modalToggle = this.modalToggle.bind(this);
  }

  modalToggle(switchName) {
    let toggleBoolean = this.state[switchName] === false;
    this.setState({[switchName]: toggleBoolean});
  }

  render() {
    return(
      <section
        className={this.props.className}
      >
        <div onClick={this.props.onClick}>
          <h3>Chat</h3>
        </div>

        <button onClick={() => this.modalToggle('showForm')}>
          + Send New Message
        </button>

        {util.renderIf(this.state.showForm,
          <Modal close={() => this.modalToggle('showForm')}>
            <ChatForm
              close={() => this.modalToggle('showForm')}
            />
          </ Modal>
        )}

      </section>
    )
  }
}

export default ChatWindow
