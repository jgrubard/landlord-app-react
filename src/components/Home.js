import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createApplicationOnServer, deleteApplicationFromServer } from '../store';

import { Button } from './Library';
import ApplicantCard from './ApplicantCard';

import '../stylesheets/Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      application_type: 'basic'
    }
    this.changeType = this.changeType.bind(this);
  }

  changeType(ev) {
    const { value } = ev.target;
    this.setState({ application_type: value });
  }

  render() {
    const { tenant_applications, createApplication, deleteApplication } = this.props;
    const { application_type } = this.state;
    const { changeType } = this;
    console.log(this.state);
    return (
      <div>
        <h1>Manage all prospective renters!</h1>
        <Button
          onClick={() => createApplication(application_type)}
          label='Create Blank Application'
        />
        <select onChange={changeType}>
          <option value='basic'>Basic</option>
          <option value='full'>Full</option>
        </select>
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
    createApplication: type => dispatch(createApplicationOnServer(type)),
    deleteApplication: id => dispatch((deleteApplicationFromServer(id)))
  }
};

export default connect(mapState, mapDispatch)(Home);