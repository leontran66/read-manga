import { Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/store';
import { AlertProps } from '../types';

import './Alert.css';

const Alert = ({ alerts }: AlertProps) => {
  const successAlerts = alerts.filter(alert => alert.field === 'success');

  return (
    <Fragment>
    { 
      successAlerts &&
      successAlerts.map(alert =>
        (<div className="position-absolute alert-container">
          <div className={`text-center px-5 alert alert-success fade ${alert ? 'show' : 'hide'}`} role='alert'>
            {alert ? alert.msg : ''}
          </div>
        </div>)
      )
    }
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);
