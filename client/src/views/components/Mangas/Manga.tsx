import './Mangas.css';

const Manga = () => {
  return (
    <div className='manga mb-3 p-4'>
      <h3 className='d-block'>
        <a href='/mangas/id'>Berserk</a>
        <a href='/mangas/id/edit' className='ms-2 btn btn-warning'>Edit Manga</a>
        <div className='float-end'><button className='btn btn-sm btn-primary'>Reading</button></div>
      </h3>
      <h6 className='fst-italic'><a href='/mangas?query='>Miura, Kentarou</a></h6>
      <p>Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.<br /><br />Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity.</p>
    </div>
  );
};

export default Manga;