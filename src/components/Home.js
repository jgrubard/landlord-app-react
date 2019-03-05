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
      error: '',
      start: 0,
      end: 5,
      page: 1
    }
    this.changeType = this.changeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
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

  nextPage() {
    this.setState({ start: this.state.start + 5, end: this.state.end + 5, page: this.state.page + 1})
  }

  prevPage() {
    this.setState({ start: this.state.start - 5, end: this.state.end - 5, page: this.state.page - 1})
  }

  render() {
    const { tenant_applications, deleteApplication } = this.props;
    const { error } = this.state;
    const { changeType, onSubmit } = this;
    const lastPage = Math.ceil(tenant_applications.length / 5);
    const paginatedApps = tenant_applications.slice(this.state.start, this.state.end);
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
        <button disabled={this.state.page <= 1} onClick={this.prevPage}>{'<<'}</button>
        <span>Page {this.state.page}/{lastPage}</span>
        <button disabled={this.state.page >= lastPage} onClick={this.nextPage}>{'>>'}</button>
        {
          tenant_applications.length !== 0 ? (
            paginatedApps.map((app, index) => {
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