import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard/Dashboard.js';

fetch('https://shielded-wildwood-44956.herokuapp.com/data.json')
  .then(res => res.json())
  .then(json => {
    const root = document.querySelector('#root');
    ReactDOM.render(<Dashboard className='Dashboard' data={json} />, root);
  });
