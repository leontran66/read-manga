import React from 'react';
import Search from './Search';

const Landing = () => {
  return (
    <div>
      <p>Keep track of your manga</p>
      <Search />
      <a href='#'>Login</a>
      <a href='#'>Register</a>
    </div>
  );
};

export default Landing;