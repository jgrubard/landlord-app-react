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
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validators = {
      email: (value) => {
        if(!value) return '*Please enter a valid email';
        const [ name, site ] = value.split('@');
        if(!name || !site) return '*Please enter a valid email';
        const [ company, ext ] = site.split('.');
        if(!company || !ext) return '*Please enter a valid email';
      },
      evictions: (value) => {
        if(!value) return '*Please do not leave this field blank.';
      },
      first_name: (value) => {
        if(!value) return '*Please do not leave this field blank.';
      },
      last_name: (value) => {
        if(!value) return '*Please do not leave this field blank.';
      },
      landlord_email: (value) => {
        if(!value) return '*Please enter a valid email';
        const [ name, site ] = value.split('@');
        if(!name || !site) return '*Please enter a valid email';
        const [ company, ext ] = site.split('.');
        if(!company || !ext) return '*Please enter a valid email';
      },
      landlord_name: (value) => {
        if(!value) return '*Please do not leave this field blank.';
      },
      landlord_phone: (value) => {
        if(!value) return "*Please enter your landlord's phone number"
        if(isNaN(Number(value))) return '*Please only enter numerical characters.';
        if(value.length !== 10) return '*Please enter a valid 10 digit number.';
      },
      phone: (value) => {
        if(!value) return '*Please enter your phone number'
        if(isNaN(Number(value))) return '*Please only enter numerical characters.';
        if(value.length !== 10) return '*Please enter a valid 10 digit number.';
      },
      maiden_name: (value) => {
        if(!value) return '*Please do not leave this field blank.';
      },
      ssn: (value) => {
        if(!value) return '*Please enter your social security number'
        if(isNaN(Number(value))) return '*Please only enter numerical characters.';
        if(value.length !== 9) return '*Please enter a valid 9 digit number.';
      }
    }
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  generateErrors(type) {
    const allKeys = Object.keys(this.validators);
    const filteredKeys = Object.keys(this.validators).filter(v => v !== 'ssn' && v !== 'maiden_name');
    const validatorsArr = type === 'Basic' ? filteredKeys : allKeys;
    return validatorsArr
      .reduce((result, key) => {
        const validator = this.validators[key];
        const value = this.state[key];
        const error = validator(value);
        if(error) result[key] = error;
        return result;
      }, {});
  }

  onSubmit(ev, app) {
    ev.preventDefault();
    const { token, updateApplication } = this.props;
    const { email, first_name, last_name, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn } = this.state;
    let errors = this.generateErrors(app.application_type);
    this.setState({ errors })
    if(Object.keys(errors).length) return;
    updateApplication({ email, first_name, last_name, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn, token });
  }

  render() {
    const { email, first_name, last_name, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn, errors } = this.state;
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
              <div className='form-title'>Please complete the form below.</div>
              <div className='form-title form-subtitle'>You have received the {applicantFoundByToken.application_type} Application.</div>

              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='First Name' name='first_name' value={first_name} onChange={handleChange}/>
                  { errors.first_name && <span className='form-error'>{errors.first_name}</span>}
                  <div className='form-label'>Please enter your first name.</div>
                </div>
                <div className='form-flex-item'>
                  <Input placeholder='Last Name' name='last_name' value={last_name} onChange={handleChange}/>
                  { errors.last_name && <span className='form-error'>{errors.last_name}</span>}
                  <div className='form-label'>Please enter your last name.</div>
                </div>
              </div>

              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='Email Address' name='email' value={email} onChange={handleChange} type='email'/>
                  { errors.email && <span className='form-error'>{errors.email}</span>}
                  <div className='form-label'>Please enter your email address.</div>
                </div>
                <div className='form-flex-item'>
                  <Input placeholder='Phone Number' name='phone' value={phone} onChange={handleChange}/>
                  { errors.phone && <span className='form-error'>{errors.phone}</span>}
                  <div className='form-label'>Please enter your phone number.<br/>{numberMessage}</div>
                </div>
              </div>

              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='Landlord Name' name='landlord_name' value={landlord_name} onChange={handleChange}/>
                  { errors.landlord_name && <span className='form-error'>{errors.landlord_name}</span>}
                  <div className='form-label'>Please enter your landlords name.</div>
                </div>
                <div className='form-flex-item'>
                  <Input placeholder='Landlord Phone Number' name='landlord_phone' value={landlord_phone} onChange={handleChange}/>
                  { errors.landlord_phone && <span className='form-error'>{errors.landlord_phone}</span>}
                  <div className='form-label'>Please enter your landlords phone number.</div>
                </div>
              </div>
              
              <div className='form-flex-container'>
                <div className='form-flex-item'>
                  <Input placeholder='Landlord Email' name='landlord_email' value={landlord_email} onChange={handleChange} type='email'/>
                  { errors.landlord_email && <span className='form-error'>{errors.landlord_email}</span>}
                  <div className='form-label'>Please enter your landlords email address.</div>
                </div>
                <div className='form-flex-item'/>
              </div>

              {
                applicantFoundByToken.application_type === 'Full' &&
                  <div className='form-flex-container'>
                    <div className='form-flex-item'>
                      <Input placeholder="Mother's Maiden Name" name='maiden_name' value={maiden_name} onChange={handleChange}/>
                      { errors.maiden_name && <span className='form-error'>{errors.maiden_name}</span>}
                      <div className='form-label'>Please enter your mother's maiden name.</div>
                    </div>
                    <div className='form-flex-item'>
                      <Input placeholder='Social Security Number' name='ssn' value={ssn} onChange={handleChange}/>
                      { errors.ssn && <span className='form-error'>{errors.ssn}</span>}
                      <div className='form-label'>Please enter your Social Security Number.<br/>{numberMessage}</div>
                    </div>
                  </div>
              }        
              
              <hr/>

              <div className='eviction-form'>
                <div className='form-label'>Please tell us if and why you have ever been evicted.</div>
                { errors.evictions && <span className='form-error'>{errors.evictions}</span>}
                <Input placeholder='Type your answer here...' name='evictions' value={evictions} onChange={handleChange} type='textarea'/>
              </div>
              <div className='center-button'>
                <Button
                  onClick={(ev) => onSubmit(ev, applicantFoundByToken)}
                  label='Submit Application'
                />
              </div>
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