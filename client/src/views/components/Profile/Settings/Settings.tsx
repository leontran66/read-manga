import { Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/store';
import { SettingsProps } from '../types';

import './Settings.css';

const Settings = ({ auth: { isLoading, user }, children }: SettingsProps) => {
  return (
    <Fragment>
    {
      !isLoading &&
      <div className="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-settings-tab">
        <div className="profile-settings card">
          <div className="card-body">
            <div className="card-text">
              <table className='table table-borderless'>
                <tbody>
                  <tr>
                    <td>Email:</td>
                    <td>{
                          !isLoading && user &&
                            user.email
                        }
                    </td>
                  </tr>
                  <tr>
                    <td>Password:</td>
                    <td>●●●●●●●●</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {children}
          </div>
        </div>
      </div>
    }
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Settings);
