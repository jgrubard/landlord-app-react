import React from 'react';
import { Link } from 'react-router-dom';

import '../../stylesheets/LinkButton.css';

const LinkButton = ({ path, label }) => {
  return (
    <div>
      <Link className='link-button' to={path}>
        {label}
      </Link>
    </div>
  );
}

export default LinkButton;