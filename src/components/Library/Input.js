import React from 'react';

import '../../stylesheets/Input.css';

const Input = ({ value, name, placeholder, onChange, type }) => {
  return(
    <div>
      {
        type === 'textarea' ? (
          <textarea
            className='text-input textarea'
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
            type={type ? type : 'text'}
          />
        )
      }
    </div>
  ); 
}

export default Input;