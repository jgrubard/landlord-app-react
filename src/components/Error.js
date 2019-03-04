import React from 'react';

import '../stylesheets/Error.css'

const Error = () => {
  const contact = 'info@landlord-app.com';
  return (
    <div className='error-message'>
      <div className='error-formatting large'>Whoops!</div>
      <div className='error-formatting'>It seems like you shouldn't be here...</div>
      <div className='error-formatting'>You have either already submitted your application or it has been removed from the system.</div>
      <div className='error-formatting'>Please contact <b><a href={`mailto: ${contact}`}>{contact}</a></b> to get a new application link.</div>
    </div>
  );
}

export default Error;