import './Profile.css';

import CreateReadingForm from '../CreateReadingForm';
import EditReadingForm from '../EditReadingForm';

const Profile = () => {
  return (
    <div className='container-fluid'>
      <div className='profile mx-auto'>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-reading-tab" data-bs-toggle="pill" data-bs-target="#pills-reading" type="button" role="tab" aria-controls="pills-reading" aria-selected="true">Reading List</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-settings-tab" data-bs-toggle="pill" data-bs-target="#pills-settings" type="button" role="tab" aria-controls="pills-settings" aria-selected="false">Settings</button>
          </li>
        </ul>
        <div className="tab-content profile-tabs" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-reading" role="tabpanel" aria-labelledby="pills-reading-tab">
            <CreateReadingForm />
            <div className='table-responsive'>
              <table className='table table-bordered align-middle'>
                <thead className='table-dark'>
                  <tr>
                    <th className='profile-manga'>Manga</th>
                    <th className='profile-chapter' colSpan={2}>Chapter</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='profile-manga'><a href='/mangas/id'>Berserk</a></td>
                    <td className='profile-chapter'>357</td>
                    <td className='profile-actions'><a href='/mangas/id/edit' className='btn btn-sm btn-primary'>Edit</a>{' '}<a href='/mangas/id/delete' className='btn btn-sm btn-danger'>Delete</a></td>
                  </tr>
                  <tr>
                    <td className='profile-manga'><a href='/mangas/id'>Berserk</a></td>
                    <td className='profile-chapter'>357</td>
                    <td className='profile-actions'><a href='/mangas/id/edit' className='btn btn-sm btn-primary'>Edit</a>{' '}<a href='/mangas/id/delete' className='btn btn-sm btn-danger'>Delete</a></td>
                  </tr>
                  <tr>
                    <td className='profile-manga'><a href='/mangas/id'>Berserk</a></td>
                    <td className='profile-chapter'>357</td>
                    <td className='profile-actions'><EditReadingForm />{' '}<a href='/mangas/id/delete' className='btn btn-sm btn-danger'>Delete</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-settings-tab">
            <div className="profile-settings card">
              <div className="card-body">
                <div className="card-text">
                  <table className='table table-borderless'>
                    <tbody>
                      <tr>
                        <td>Email:</td>
                        <td>leontran66@gmail.com</td>
                      </tr>
                      <tr>
                        <td>Password:</td>
                        <td>●●●●●●●●</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a href="/profile/edit" className="btn btn-primary">Update Password</a>
                <button type="button" className='btn btn-danger mx-2' data-bs-toggle="modal" data-bs-target="#deleteUser">Delete Account</button>
                <div className="modal fade" id="deleteUser" tabIndex={-1} aria-labelledby="deleteUserLabel" aria-hidden="true">
                  <div className="modal-dialog modal-fullscreen-sm-down">
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title'>Confirmation of Account Deletion</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className='modal-body'>
                        <p>Are you sure you wish to delete your account? This action is irreversible.</p>
                      </div>
                      <div className='modal-footer'>
                        <a href='/users/delete' className='btn btn-danger'>Delete Account</a>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;