import React from 'react';

import './MainContainer.css';

interface Props {
  children: React.ReactNode
};

const MainContainer = (props: Props) => {
  return (
    <div className='main-container'>
      {props.children}
    </div>
  );
};

export default MainContainer;
