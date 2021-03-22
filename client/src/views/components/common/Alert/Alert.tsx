import { connect } from 'react-redux';
import { RootState } from '../../../../state/store';
import { AlertProps } from '../../../types/Props';

import './Alert.css';

const Alert = ({ alerts }: AlertProps) => {
  const alert = alerts.find(alert => alert.alertField === 'success');

  return (
    <div className="position-absolute alert-container">
      <div className={`text-center px-5 alert alert-success fade ${alert ? 'show' : 'hide'}`} role='alert'>
        {alert ? alert.msg : ''}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);
