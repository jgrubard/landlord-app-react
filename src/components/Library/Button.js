import React from 'react';

import '../../stylesheets/Button.css';

const Button = ({ onClick, label}) => {
  return (
    <button onClick={onClick} className='button'>
      {label}
    </button>
  );
}

export default Button;