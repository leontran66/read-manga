import './Landing.css';

const Landing = () => {
  return (
    <div className='container-lg'>
      <div className='landing'>
        <div className='position-absolute top-50 start-50 translate-middle'>
          <h1 className='text-center'>Manga Tracker</h1>
          <h4 className='text-center'>Keep track of manga you are reading, or manga want to read,<br />all in one place.</h4>
          <form className='row row-cols-auto g-2 align-items-center' method='GET' action='/manga'>
            <div className='col-10'>
              <label htmlFor='search' className='form-label'></label>
              <input type='text' className='form-control' id='search' name='query' placeholder='Title, Author or Genre...' />
            </div>
            <div className='col-2'>
              <button type='submit' className='mt-4 btn btn-primary'>Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;