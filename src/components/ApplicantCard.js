import React from 'react';

import { Button, LinkButton } from './Library';
import '../stylesheets/ApplicantCard.css';

const ApplicantCard = ({ application, deleteApplication, index }) => {
  const { id, token, application_type } = application;
  const color = index % 2 === 0 ? 'white' : 'blue'
  const appUrl = `http://localhost:3001/#/applications/${token}`;
  return (
    <div className={`app-card bg-${color}`}>
      <div className='card-title'>Application #{id}: {application_type} Application</div>
      {
        !!token ? (
          <p>Application Link:
            &nbsp;
            <a href={appUrl}><b>{appUrl}</b></a>
          </p>
        ) : <p>No Link: Application Submitted</p>
      }
      {
        !token && <LinkButton
            path={`/applications/completed/${id}`}
            label='Click to see applicant Data'
          />
      }

      <Button
        onClick={() => deleteApplication(id)}
        label={`Delete Application ${id}`}
        color=' btn-delete'
      />
    </div>
  );
}

export default ApplicantCard;