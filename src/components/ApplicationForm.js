import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateApplicationOnServer } from '../store';

import { Input, Button } from './Library';
import Error from './Error';

import '../stylesheets/ApplicationForm.css';

class ApplicationForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      evictions: '',
      first_name: '',
      last_name: '',
      landlord_email: '',
      landlord_name: '',
      landlord_phone: '',
      maiden_name: '',
      phone: '',
      ssn: '',
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
    const { email, first_name, last_name, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn } = this.state;
    updateApplication({ email, first_name, last_name, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn, token });
    this.setState({ email: '' });
  }

  render() {
    const { email, first_name, last_name, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn } = this.state;
    const { token, tenant_applications } = this.props;
    const { handleChange, onSubmit } = this;
    const applicantFoundByToken = tenant_applications.find(app => app.token === token);
    const tokenStatus = !!applicantFoundByToken;
    const numberMessage = <span className='number-message'>*Do not use any non-numerical characters.</span>;
    return (
      <div>
        {
          tokenStatus ? (
            <div>
              <h2>Please complete the form below.</h2>
              <h3>You have received the <i>{applicantFoundByToken.application_type}</i> Application.</h3>

              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='First Name' name='first_name' value={first_name} onChange={handleChange}/>
                  <div className='form-label'>Please enter your first name.</div>
                </div>
                <div className='form-flex-item'>
                  <Input placeholder='Last Name' name='last_name' value={last_name} onChange={handleChange}/>
                  <div className='form-label'>Please enter your last name.</div>
                </div>
              </div>

              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='Email Address' name='email' value={email} onChange={handleChange}/>
                  <div className='form-label'>Please enter your email address.</div>
                </div>
                <div className='form-flex-item'>
                  <Input placeholder='Phone Number' name='phone' value={phone} onChange={handleChange}/>
                  <div className='form-label'>Please enter your phone number.<br/>{numberMessage}</div>
                </div>
              </div>

              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='Landlord Name' name='landlord_name' value={landlord_name} onChange={handleChange}/>
                  <div className='form-label'>Please enter your landlords name.</div>
                </div>
                <div className='form-flex-item'>
                  <Input placeholder='Landlord Phone Number' name='landlord_phone' value={landlord_phone} onChange={handleChange}/>
                  <div className='form-label'>Please enter your landlords phone number.</div>
                </div>
              </div>
              
              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='Landlord Email' name='landlord_email' value={landlord_email} onChange={handleChange}/>
                  <div className='form-label'>Please enter your landlords email address.</div>
                </div>
                <div className='form-flex-item'/>
              </div>

              {
                applicantFoundByToken.application_type === 'Full' &&
                  <div className='form-flex-container'>
                    <div className='form-flex-item'>
                      <Input placeholder="Mother's Maiden Name" name='maiden_name' value={maiden_name} onChange={handleChange}/>
                      <div className='form-label'>Please enter your mother's maiden name.</div>
                    </div>
                    <div className='form-flex-item'>
                      <Input placeholder='Social Security Number' name='ssn' value={ssn} onChange={handleChange}/>
                      <div className='form-label'>Please enter your Social Security Number.<br/>{numberMessage}</div>
                    </div>
                  </div>
              }        
              
              <hr/>

              <div className='eviction-form'>
                <div className='form-label'>Please tell us if and why you have ever been evicted.</div>
                <Input placeholder='Type your answer here...' name='evictions' value={evictions} onChange={handleChange} type='textarea'/>
              </div>

              <Button
                onClick={onSubmit}
                label='Submit Application'
              />
            </div>
          ) : (
            <div>
              <Error />
            </div>
          )
        }
      </div>
    );
  }
}

const mapState = ({ tenant_applications }) => {
  return { tenant_applications }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    updateApplication: tenant_application => dispatch(updateApplicationOnServer(tenant_application, history))
  }
}

export default connect(mapState, mapDispatch)(ApplicationForm);