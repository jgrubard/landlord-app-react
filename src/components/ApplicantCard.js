import React from 'react';

import { Button, LinkButton } from './Library';
import '../stylesheets/ApplicantCard.css';

const ApplicantCard = ({ application, deleteApplication, index }) => {
  const { id, token, application_type } = application;
  const color = index % 2 === 0 ? 'grey' : 'white'
  const appUrl = `http://localhost:3001/#/applications/${token}`;
  return (
    <div className={`app-card bg-${color}`}>
      <div className='card-title'>Application #{id}: {application_type}</div>
      {
        !!token ? (
          <p>Link (send to applicant):
            &nbsp;
            <a href={appUrl}>{appUrl}</a>
          </p>
        ) : <p>No Link to send -- applicant has submitted application</p>
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
      />
    </div>
  );
}

export default ApplicantCard;