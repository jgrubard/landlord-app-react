import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createApplicationOnServer } from '../store';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      // tenant_applications: []
    }
  }

  render() {
    return (
      <div>
        <h1>Landlord App</h1>
        <button onClick={this.props.createApplication}>new app</button>
        {
          !this.props.tenant_applications.length ?
            <p>There are currently ZERO applications</p> :
            this.props.tenant_applications.map(app => {
              return (
                <div key={app.id}>
                  <h4>Application {app.id}</h4>
                  <p>Link: http://192.168.1.175:3000/applications/{app.token}</p>
                </div>
              );
            })
        }
      </div>
    );
  }
}

const mapState = ({ tenant_applications }) => ({ tenant_applications });

const mapDispatch = dispatch => {
  return {
    createApplication: () => dispatch(createApplicationOnServer())
  }
};

export default connect(mapState, mapDispatch)(Home);