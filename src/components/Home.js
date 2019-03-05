import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createApplicationOnServer, deleteApplicationFromServer } from '../store';

import { Button, Pagination } from './Library';
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
    const { start, end, page } = this.state;
    this.setState({ start: start + 5, end: end + 5, page: page + 1})
  }

  prevPage() {
    const { start, end, page } = this.state;
    this.setState({ start: start - 5, end: end - 5, page: page - 1})
  }

  render() {
    const { tenant_applications, deleteApplication } = this.props;
    const { error, page } = this.state;
    const { changeType, onSubmit, prevPage, nextPage } = this;
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
        {
          lastPage > 1 &&
            <Pagination
              page={page}
              prevPage={prevPage}
              nextPage={nextPage}
              lastPage={lastPage}
            />
        }
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
        {
          lastPage > 1 &&
            <Pagination
              page={page}
              prevPage={prevPage}
              nextPage={nextPage}
              lastPage={lastPage}
            />
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