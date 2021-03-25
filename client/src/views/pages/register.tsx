import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainContainer from '../components/common/MainContainer';
import RegisterForm from '../components/Register/RegisterForm';
import RegisterWrapper from '../components/Register/RegisterWrapper/RegisterWrapper';

const RegisterLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <RegisterWrapper>
          <RegisterForm />
        </RegisterWrapper>
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default RegisterLayout;
