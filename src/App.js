import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getApplicationsFromServer } from './store';

import Home from './components/Home';
import ApplicationForm from './components/ApplicationForm';

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
            <Route exact path='/applications/:token' component={({ match }) => <ApplicationForm token={match.params.token}/>} />
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
