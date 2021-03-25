import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainContainer from '../components/common/MainContainer';
import Settings from '../components/Profile/Settings';
import EditProfileForm from '../components/common/modals/EditProfileForm';
import DeleteProfileForm from '../components/common/modals/DeleteProfileForm';
import ProfileTabs from '../components/Profile/ProfileTabs';
import Readings from '../components/Profile/Readings';
import ProfileWrapper from '../components/Profile/ProfileWrapper/ProfileWrapper';

const ProfileLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <ProfileWrapper>
          <ProfileTabs>
            <Readings />
            <Settings>
              <EditProfileForm />
              <DeleteProfileForm />
            </Settings>
          </ProfileTabs>
        </ProfileWrapper>
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default ProfileLayout;
