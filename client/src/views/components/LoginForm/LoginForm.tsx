import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className='container-fluid'>
      <div className='login-form mx-auto'>
        <form method='POST' action='/login'>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email</label>
              <input type='email' className='form-control' id='email' name='email' />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id='password' name='password' />
          </div>
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;