import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainContainer from '../components/common/MainContainer';
import RegisterForm from '../components/RegisterForm';

const RegisterLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <RegisterForm />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default RegisterLayout;