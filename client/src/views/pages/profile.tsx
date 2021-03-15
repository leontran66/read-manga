import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainContainer from '../components/common/MainContainer';
import Profile from '../components/Profile';

const ProfileLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <Profile />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default ProfileLayout;