import React from 'react';
import {connect} from 'react-redux';
import './_chat-form.scss';
import Modal from '../../modal';

import AddUserForm from '../add-user-form';

class ChatForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      content: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addMember = this.addMember.bind(this);
  }

  componentDidUpdate() {
    console.log('__FORM_STATE__',this.state);
  }



  onChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  onSubmit(e) {
    e.preventDefault();

    if(this.props.close) this.props.close();
  }

  addMember(state) {
    let {members} = this.state;
    members.push(state);
    this.setState({members});
  }

  removeMember(val) {
    let {members} = this.state;
    members = members.filter(member => member.userName !== val);
    this.setState({members});
  }

  render() {
    return(
      <form onSubmit={this.onSubmit} className='chat-form'>
        <ul>
          {this.state.members.map((member, ind) => {
            return(
              <li key={ind}>
                <p>{member.userName}</p>
                <p onClick={() => this.removeMember(member.userName)}>X</p>
              </li>
            )
          })}
        </ul>
        <AddUserForm
          onComplete={this.addMember}
        />
        <textarea
          type='text'
          name='content'
          placeholder='Enter Message'
          value={this.state.content}
          onChange={this.onChange}
        ></textarea>
        <button type='submit'>Send Message</button>
      </form>
    )
  }
}

let mapStateToProps = state => ({
  socket: state.socket,
  profile: state.profile,
})

export default connect(mapStateToProps, undefined)(ChatForm);
