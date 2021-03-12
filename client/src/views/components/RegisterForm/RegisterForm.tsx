import './RegisterForm.css';

const RegisterForm = () => {
  return (
    <div className='container-fluid'>
      <div className='register-form mx-auto'>
        <form method='POST' action='/register'>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email</label>
              <input type='email' className='form-control' id='email' name='email' />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id='password' name='password' autoComplete='on' />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPW' className='form-label'>Confirm Password</label>
            <input type='password' className='form-control' id='confirmPW' name='confirmPW' autoComplete='on' />
          </div>
          <a href='/login'>Already have an account? Login</a>
          <br />
          <button type='submit' className='mt-3 btn btn-primary'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;