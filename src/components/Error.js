import React from 'react';

import '../stylesheets/Error.css'

const Error = () => {
  const contact = 'info@landlord-app.com';
  return (
    <div className='error-message'>
      <div className='error-formatting large'>HTTP 404: Not Found</div>
      <div className='error-formatting'>Whoops! You shouldn't be here...</div>
      <div className='error-formatting'>You seem to have an invalid token!</div>
      <div className='error-formatting'>For a new link, please contact
        <br/>
        <b><a href={`mailto: ${contact}`}>{contact}</a></b>
      </div>
    </div>
  );
}

export default Error;