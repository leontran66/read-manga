import './Manga.css';

const Manga = () => {
  return (
    <div className='manga mb-3 p-4'>
      <h3 className='d-block'>
        Berserk
        <a href='/manga/id/edit' className='ms-2 btn btn-primary'>Edit</a>
        <a href='/manga/id/delete' className='ms-2 btn btn-danger'>Delete</a>
        <div className='float-end'><button className='btn btn-primary'>Add To Reading List</button></div>
      </h3>
      <h6 className='fst-italic'><a href='/manga?query='>Miura, Kentarou</a></h6>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Action</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Adventure</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Demons</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Drama</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Fantasy</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Horror</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Supernatural</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Military</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Psychological</span></a>
      <a href='/manga?query='><span className='badge rounded-pill bg-primary mb-2 me-1'>Seinen</span></a>
      <p>Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.<br /><br />Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity.</p>
    </div>
  );
};

export default Manga;
