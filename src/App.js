import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getApplicationsFromServer } from './store';

import Home from './components/Home';

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
            <Route component={Home} />
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
