import React from 'react';
import './selector.css'

const selector = ({value, onChange}) => {
  return (
    <div className='selector'>
      <label htmlFor="options"></label>
        <select 
          id='options'
          value={value}
          onChange={onChange}
        >
          <option value="All">All</option>
          <option value="Complete">Complete</option>
          <option value="Incomplete">InComplete</option>
        </select>
    </div>
  )
}

export default selector;
