import { Fragment } from 'react';

import EditProfileForm from '../components/EditProfileForm';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
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
