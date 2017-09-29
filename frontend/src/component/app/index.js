import './_app.scss';
import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';

import Dashboard from '../dashboard-components/dashboard';
import ProfileView from '../profile-components/profile-view';
import Landing from '../landing';
import NavBar from '../navbar-components/navbar';
import MsgBar from '../msg-components/messanger-bar';
import ProfileSettings from '../profile-components/profile-settings';
import BookingView from '../booking-components/booking-view';

class App extends React.Component {

  responseGoogle(response) {
    superagent('')
  }

  render() {
    return(
      <BrowserRouter>
        <span>
          <Route exact path='*' component={NavBar} />
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/settings' component={ProfileSettings} />
          <Route exact path='/bookings/:userName' component={BookingView} />
          {util.renderIf(this.props.profile,
            <Route exact path='*' component={MsgBar} />
          )}
          <Route exact path='/profile/:userName' component={ProfileView} />


        </span>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  socket: state.socket
});

export default connect(mapStateToProps, undefined)(App);
