import React from 'react';
import { connect } from 'react-redux';

import { LinkButton } from './Library';

const CompletedApplication = ({ application }) => {
  if(!application) return null;
  return (
    <div>
      <h1>Applicant Data</h1>
      <LinkButton
        path='/'
        label='Back to All Applications'
      />
      <p>First Name: </p>
      <p>Last Name: </p>
      <p>Email: {application.email}</p>
      <p>Phone Number: </p>
      <p>Previous Landlord's Name: </p>
      <p>Previous Landlord's Email: </p>
      <p>Previous Landlord's Phone: </p>
      <p>Evictions: </p>
      
    </div>
  );
}

const mapState = ({ tenant_applications }, { id }) => {
  const application = tenant_applications.find(app => app.id === id);
  return { application }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(CompletedApplication);