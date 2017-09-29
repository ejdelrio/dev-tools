import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

import * as util from '../../../lib/util.js';
import './_auto-complete-form.scss';

class AddMember extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMatches: [],
      userName: ''
    }
    this.onChange = this.onChange.bind(this);
    this.APIQuery = this.APIQuery.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value});
    this.APIQuery(value);
  }

  APIQuery(userName) {
    if(userName === '') return this.setState({currentMatches: []});

    superagent.get(`${__API_URL__}/api/profile-auto/${userName}`)
    .end((err, res) => {
      if(err) console.error(err);
      this.setState({currentMatches: res.body});
    })
  }

  onClick(member) {
    this.props.onComplete(member);
    this.setState({
      currentMatches: [],
      userName: ''
    })
  }

  render() {

    return(
      <div className='auto-comp'>
        <input
          name='userName'
          type='text'
          placeholder='Enter User Name'
          value={this.state.userName}
          onChange={this.onChange}
          autoComplete="off"
        />
          {util.renderIf(this.state.currentMatches.length > 0,
            <ul>
              {this.state.currentMatches.map((member, ind) => {
                return(
                  <li key={ind} onClick={() => this.onClick(member)}>
                    <p>{member.userName}<span>Add</span></p>
                  </li>
                )
              })}
            </ul>
          )}
      </div>
    )
  }
}


export default AddMember;
