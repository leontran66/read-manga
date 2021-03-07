import React from 'react';

const Login = () => {
  return (
    <div>
      <form>
        <input type='text' />
        <input type='password' />
        <input type='submit' value='Login' />
      </form>
      <p>Don't have an account? <a href='/register'>Register</a></p>
    </div>
  );
};

export default Login;