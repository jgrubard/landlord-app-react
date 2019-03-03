import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';

class App extends Component {

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

export default App;
