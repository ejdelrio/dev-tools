import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';

class App extends React.Component {


  render() {
    return(
      <BrowserRouter>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  token: state.token
});

export default connect(mapStateToProps, undefined)(App);
