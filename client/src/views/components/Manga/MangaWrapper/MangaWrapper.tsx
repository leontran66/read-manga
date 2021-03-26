import { connect } from 'react-redux';
import { ContainerProps } from '../../common/types';

import './MangaWrapper.css';

const MangaWrapper = ({ children }: ContainerProps) => {
  return (
    <div className='manga mx-auto'>{children}</div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(MangaWrapper);
