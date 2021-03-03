import React from 'react';

const Register = () => {
  return (
    <div>
      <p>Already have an account? <a href='/login'>Login</a></p>
      <form>
        <input type='text' />
        <input type='password' />
        <input type='password' />
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default Register;