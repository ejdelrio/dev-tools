import './_auth-form.scss';
import React from 'react';
import * as util from '../../lib/util.js';
class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      passWord: '',
      userNameError: null,
      passWordError: null,
      emailError: null,
      error: null
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    let { name, value } = e.target;

    function errorCheck(errorName) {
      return name === errorName && !value ? `${errorName} required` : null;
    }

    this.setState({
      [name]: value,
      userNameError: errorCheck('username'),
      emailError: errorCheck('email'),
      passWordError: errorCheck('password')
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state)
      .then(() => {
        this.setState({
          userName: '',
          passWord: '',
          email: ''
        });
        this.props.modalClose();
      })
      .catch(error => {
        this.setState({ error });
      })
  }

  render() {
    let emailInput = (
      <input
        name='email'
        type='text'
        placeholder='Enter a valid email address'
        value={this.state.email}
        onChange={this.onChange}
      />
    )


    return (
      <form onSubmit={this.onSubmit} className='auth-form'>

        <input
          name='userName'
          type='text'
          value={this.state.userName}
          placeholder='Enter a valid user name'
          onChange={this.onChange}
        />
        <input
          name='passWord'
          type='password'
          value={this.state.passWord}
          placeholder='Enter a password'
          onChange={this.onChange}
        />
        {util.renderIf(this.props.auth === 'signup', emailInput)}
        <button type='submit'>{this.props.auth}</button>
      </form>
    );
  };
}

export default AuthForm;
