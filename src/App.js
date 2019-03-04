import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getApplicationsFromServer } from './store';

import Home from './components/Home';
import ApplicationForm from './components/ApplicationForm';
import ThankYou from './components/ThankYou';

import './App.css';

class App extends Component {

  componentDidMount() {
    const { loadApplications } = this.props;
    loadApplications();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Switch>
              <Route exact path='/applications/thank-you' component={() => <ThankYou />} />
              <Route exact path='/applications/:token' component={({ match, history }) => <ApplicationForm token={match.params.token} history={history}/>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => {
  return {
    loadApplications: () => dispatch(getApplicationsFromServer())
  }
}

export default connect(mapState, mapDispatch)(App);
