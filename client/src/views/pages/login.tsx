import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoginForm from '../components/Login/LoginForm';
import LoginWrapper from '../components/Login/LoginWrapper';
import MainContainer from '../components/common/MainContainer';

const LoginLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <LoginWrapper>
          <LoginForm />
        </LoginWrapper>
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default LoginLayout;
