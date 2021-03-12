import { Fragment } from 'react';

import EditProfileForm from '../components/EditProfileForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContainer from '../components/common/MainContainer';

const EditProfileLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <EditProfileForm />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default EditProfileLayout;