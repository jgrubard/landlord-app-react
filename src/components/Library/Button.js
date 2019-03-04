import React from 'react';

import '../../stylesheets/Button.css';

const Button = ({ onClick, label, color}) => {
  color = color ? color : '';
  return (
    <button onClick={onClick} className={`button${color}`}>
      {label}
    </button>
  );
}

export default Button;