import React from 'react';

function Spinner() {
  return (
    <div>
      <div className='text-center'>
        <div className='spinner-grow text-success m-2' role='status' />
        <div className='spinner-grow text-danger m-2' role='status' />
        <div className='spinner-grow text-warning m-2' role='status' />
        <h6>Loading. . . .</h6>
      </div>
    </div>
  );
}

export default Spinner;
