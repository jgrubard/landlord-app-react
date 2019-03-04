import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createApplicationOnServer, deleteApplicationFromServer } from '../store';

import { Button } from './Library';
import ApplicantCard from './ApplicantCard';

import '../stylesheets/Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { tenant_applications, createApplication, deleteApplication } = this.props;
    return (
      <div>
        <h1>Manage all prospective renters!</h1>
        <Button
          onClick={createApplication}
          label='Create Blank Application'
        />
        {
          tenant_applications.length !== 0 ? (
            tenant_applications.map((app, index) => {
              return (
                <ApplicantCard
                  key={app.id}
                  application={app}
                  deleteApplication={deleteApplication}
                  index={index}
                />
              );
            })
          ) : <p>There are currently 0 applications</p>
        }
      </div>
    );
  }
}

const mapState = ({ tenant_applications }) => ({ tenant_applications });

const mapDispatch = dispatch => {
  return {
    createApplication: () => dispatch(createApplicationOnServer()),
    deleteApplication: id => dispatch((deleteApplicationFromServer(id)))
  }
};

export default connect(mapState, mapDispatch)(Home);