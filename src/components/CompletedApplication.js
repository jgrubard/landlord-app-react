import React from 'react';
import { connect } from 'react-redux';

import { LinkButton } from './Library';

import '../stylesheets/CompletedApplication.css';

const formatPhone = p => {
  return `(${p.slice(0,3)}) ${p.slice(3,6)}-${p.slice(6)}`;
}

const CompletedApplication = ({ application }) => {
  if(!application) return null;
  const { id, application_type, first_name, last_name, email, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn } = application;
  return (
    <div>
      <div className='completed-app-title'>{first_name} {last_name}'s Application - #{id} ({application_type})</div>
      <LinkButton
        path='/'
        label='Back to All Applications'
      />
      <div className='data-container'>

        <div className='data-flex-container bg-gray'>
          <div className='data-flex-item item-key'>Applicant Name:</div>
          <div className='data-flex-item item-value'>{first_name} {last_name}</div>
        </div>

        <div className='data-flex-container'>
          <div className='data-flex-item item-key'>Email:</div>
          <div className='data-flex-item item-value'>{email}</div>
        </div>

        <div className='data-flex-container bg-gray'>
          <div className='data-flex-item item-key'>Phone Number:</div>
          <div className='data-flex-item item-value'>{formatPhone(phone)}</div>
        </div>

        <div className='data-flex-container'>
          <div className='data-flex-item item-key'>Previous Landlord's Name:</div>
          <div className='data-flex-item item-value'>{landlord_name}</div>
        </div>

        <div className='data-flex-container bg-gray'>
          <div className='data-flex-item item-key'>Previous Landlord's Email:</div>
          <div className='data-flex-item item-value'>{landlord_email}</div>
        </div>

        <div className='data-flex-container'>
          <div className='data-flex-item item-key'>Previous Landlord's Phone:</div>
          <div className='data-flex-item item-value'>{formatPhone(landlord_phone)}</div>
        </div>

        {
          application_type === 'Full' &&
            <div>
              <div className='data-flex-container bg-gray'>
                <div className='data-flex-item item-key'>Mother's Maiden Name:</div>
                <div className='data-flex-item item-value'>{maiden_name}</div>
              </div>
              <div className='data-flex-container'>
                <div className='data-flex-item item-key'>Social Security Number:</div>
                <div className='data-flex-item item-value'>{ssn}</div>
              </div>
            </div>
        }
        <div className='bg-gray'>
          <div className='data-flex-item item-key data-evictions'>Evictions:</div>
          <div className='data-flex-item item-value data-evictions'>{evictions}</div>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ tenant_applications }, { id }) => {
  const application = tenant_applications.find(app => app.id === id);
  return { application }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(CompletedApplication);