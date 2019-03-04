import React from 'react';
import { connect } from 'react-redux';

import { LinkButton } from './Library';

const CompletedApplication = ({ application }) => {
  if(!application) return null;
  const { application_type, first_name, last_name, email, phone, landlord_name, landlord_phone, landlord_email, evictions, maiden_name, ssn } = application;
  return (
    <div>
      <h1>Applicant Data</h1>
      <LinkButton
        path='/'
        label='Back to All Applications'
      />
      <p>Applicant Name: {first_name} {last_name}</p>
      <p>Email: {email}</p>
      <p>Phone Number: {phone}</p>
      <p>Previous Landlord's Name: {landlord_name}</p>
      <p>Previous Landlord's Email: {landlord_email}</p>
      <p>Previous Landlord's Phone: {landlord_phone}</p>
      <p>Evictions: {evictions}</p>
      {
        application_type === 'full' &&
          <div>
            <p>Mother's Maiden Name: {maiden_name}</p>
            <p>Social Security Number: {ssn}</p>
          </div>
      }
    </div>
  );
}

const mapState = ({ tenant_applications }, { id }) => {
  const application = tenant_applications.find(app => app.id === id);
  return { application }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(CompletedApplication);