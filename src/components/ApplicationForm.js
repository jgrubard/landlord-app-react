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
    // console.log(this.state.email)
    const { token } = this.props;
    const { email } = this.state;
    this.props.updateApplication({ email, token })
    this.setState({ email: '' });
  }

  render() {
    const { token } = this.props;
    return (
      <div>
        <h2>This should be a form for applicants to fill out</h2>
        <h3>{token}: applicants temp token. this should disappear once the application is submitted</h3>
        <input placeholder='email address' name='email' value={this.state.email} onChange={this.handleChange}/>
        <button onClick={this.onSubmit}>Submit Application</button>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => {
  return {
    updateApplication: application => dispatch(updateApplicationOnServer(application))
  }
}

export default connect(mapState, mapDispatch)(ApplicationForm);