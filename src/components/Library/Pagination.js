import React from 'react';
import '../../stylesheets/Pagination.css';

const Pagination = ({ page, prevPage, nextPage, lastPage }) => {
  return (
    <div className='pagination-flex-container'>
      <button
        className='pagination-button'
        disabled={page <= 1}
        onClick={prevPage}
      >
        Previous
      </button>
      <span
        className='page-text'
      >
        Page {page}/{lastPage}
      </span>
      <button
        className='pagination-button' 
        disabled={page >= lastPage}
        onClick={nextPage
      }>
        Next
      </button>
    </div>
  );
}

export default Pagination;