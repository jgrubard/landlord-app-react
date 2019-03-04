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
  const formattedPhone = formatPhone(phone);
  return (
    <div>
      <div className='completed-app-title'>{first_name} {last_name}'s Application - #{id}</div>
      <LinkButton
        path='/'
        label='Back to All Applications'
      />
      <div className='data-container'>
        <p><i>Applicant Name:</i> <b>{first_name} {last_name}</b></p>
        <p><i>Email:</i> <b>{email}</b></p>
        <p><i>Phone Number:</i> <b>{formattedPhone}</b></p>
        <p><i>Previous Landlord's Name:</i> <b>{landlord_name}</b></p>
        <p><i>Previous Landlord's Email:</i> <b>{landlord_email}</b></p>
        <p><i>Previous Landlord's Phone:</i> <b>{landlord_phone}</b></p>
        <p><i>Evictions:</i> <b>{evictions}</b></p>
        {
          application_type === 'full' &&
            <div>
              <p><i>Mother's Maiden Name:</i> <b>{maiden_name}</b></p>
              <p><i>Social Security Number:</i> <b>{ssn}</b></p>
            </div>
        }
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