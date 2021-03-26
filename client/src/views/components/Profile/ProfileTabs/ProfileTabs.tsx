import { Fragment } from 'react';
import { ContainerProps } from '../types';

import './ProfileTabs.css';

const ProfileTabs = (props: ContainerProps) => {
  return (
    <Fragment>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="pills-reading-tab" data-bs-toggle="pill" data-bs-target="#pills-reading" type="button" role="tab" aria-controls="pills-reading" aria-selected="true">Reading List</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-settings-tab" data-bs-toggle="pill" data-bs-target="#pills-settings" type="button" role="tab" aria-controls="pills-settings" aria-selected="false">Settings</button>
        </li>
      </ul>
      <div className="tab-content profile-tabs" id="pills-tabContent">
        {props.children}
      </div>
    </Fragment>
  );
};

export default ProfileTabs;
