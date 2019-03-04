import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateApplicationOnServer } from '../store';

class ApplicationForm extends Component {
  constructor() {
    super();
    this.state = {
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { token, updateApplication } = this.props;
    const { email } = this.state;
    updateApplication({ email, token })
    this.setState({ email: '' });
  }

  render() {
    const { email } = this.state;
    const { token, tenant_applications } = this.props;
    const { handleChange, onSubmit } = this;
    const applicantFoundByToken = !!tenant_applications.find(app => app.token === token);
    return (
      <div>
        {
          applicantFoundByToken ? (
            <div>
              <h2>This should be a form for applicants to fill out</h2>
              <h3>{token}: applicants temp token. this should disappear once the application is submitted</h3>
              <input placeholder='email address' name='email' value={email} onChange={handleChange}/>
              <button onClick={onSubmit}>Submit Application</button>
            </div>
          ) : (
            <div>
              <h2>Sorry! Either the token has expired of the application has been removed. Please contact Soandso to get a new application link.</h2>
            </div>
          )
        }
      </div>
    );
  }
}

// const mapState = null;

const mapState = ({ tenant_applications }) => {
  return {
    tenant_applications
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    updateApplication: tenant_application => dispatch(updateApplicationOnServer(tenant_application, history))
  }
}

export default connect(mapState, mapDispatch)(ApplicationForm);



/* 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateApplicationOnServer } from '../store';

// import axios from 'axios';
// import url from '../store/production_url';

class ApplicationForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      // token: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.findToken();
  // }

  // findToken() {
  //   const { token } = this.props;
  //   return axios.get(url + token)
  //     .then(res => res.data)
  //     .then(tenant_application => this.setState({ token: tenant_application.token }))
  //     .catch(err => console.log('ERR0R!!', { err }));
  // }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { token, updateApplication } = this.props;
    const { email } = this.state;
    updateApplication({ email, token })
    this.setState({ email: '' });
  }

  render() {
    const { email } = this.state;
    const { application } = this.props;
    const { handleChange, onSubmit } = this;
    return (
      <div>
        <h2>This should be a form for applicants to fill out</h2>
        {
          application ? (
            <div>
              <h3>{application.token}: applicants temp token. this should disappear once the application is submitted</h3>
              <input placeholder='email address' name='email' value={email} onChange={handleChange}/>
              <button onClick={onSubmit}>Submit Application</button>
            </div>
          ) : (
            <h1>Cannot find token</h1>
          )

        }

      </div>
    );
  }
}

const mapState = ({ tenant_applications }, { token }) => {
  // const { token } = this.props;
  const application = tenant_applications.find(app => app.token === token);
  return {
    application
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    updateApplication: tenant_application => dispatch(updateApplicationOnServer(tenant_application, history))
  }
}

export default connect(mapState, mapDispatch)(ApplicationForm);

*/