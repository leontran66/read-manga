import { Fragment } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
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