import { ContainerProps } from '../../../types/Props';

import './MainContainer.css';

const MainContainer = (props: ContainerProps) => {
  return (
    <div className='main-container'>
      <div className='container-fluid'>
        {props.children}
      </div>
    </div>
  );
};

export default MainContainer;
