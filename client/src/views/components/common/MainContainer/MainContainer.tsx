import { ContainerProps } from '../../../types/Props';

import './MainContainer.css';

const MainContainer = (props: ContainerProps) => {
  return (
    <div className='main-container'>
      {props.children}
    </div>
  );
};

export default MainContainer;
