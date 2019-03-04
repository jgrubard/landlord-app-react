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
      application_type: '',
      error: ''
    }
    this.changeType = this.changeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeType(ev) {
    const { value } = ev.target;
    this.setState({ application_type: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { application_type } = this.state;
    const { createApplication } = this.props;
    if(!application_type) {
      this.setState({ error: 'Please select an Application Type' });
      return;
    }
    createApplication(application_type);
    this.setState({ error: '' });
  }

  render() {
    const { tenant_applications, deleteApplication } = this.props;
    const { error } = this.state;
    const { changeType, onSubmit } = this;
    return (
      <div>
        <div className='home-title'>Renter Application Manager</div>
        <div className='new-application'>
          <div>
            <select onChange={changeType} className='dropdown-menu'>
              <option value=''>Select an Application Type</option>
              <option value='Basic'>Basic Application</option>
              <option value='Full'>Full Application</option>
            </select>
            { error && <div className='error'>{error}</div>}
          </div>
          <Button
            onClick={onSubmit}
            label='Create Blank Application'
          />
        </div>
        <div className='all-applications'>
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