import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import APIAutofill from '../APIAutofill';


class App extends React.Component {


  render() {
    return(
      <BrowserRouter>
        <APIAutofill
          path='test'
          placeholder='test'
          modelPropertyName='test'
          onComplete='test'
        />
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  token: state.token
});

export default connect(mapStateToProps, undefined)(App);
