import React from 'react';

import '../../stylesheets/Input.css';

const Input = ({ value, name, placeholder, onChange, type }) => {
  return(
    <div>
      {
        type === 'textarea' ? (
          <textarea
            className='text-input'
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            rows={7}
          />
        ) : (
          <input
            className='text-input'
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        )
      }
    </div>
  ); 
}

export default Input;