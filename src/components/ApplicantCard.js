import React from 'react';

import { Button, LinkButton } from './Library';
import '../stylesheets/ApplicantCard.css';

import { application_url } from '../store/production_url';

const ApplicantCard = ({ application, deleteApplication, index }) => {
  const { id, token, application_type } = application;
  const color = index % 2 === 0 ? 'white' : 'blue'
  const appUrl = application_url + token;
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
      <div className='button-flex-group'>
        <div className='button-flex-item'>
          <Button
            onClick={() => deleteApplication(id)}
            label='Delete'
            color=' btn-delete'
          />
        </div>
        {
          !token &&
            <div className='button-flex-item'>
              <LinkButton
                path={`/applications/completed/${id}`}
                label='Click to see Applicant Data'
              />
            </div>
        }
      </div>
    </div>
  );
}

export default ApplicantCard;