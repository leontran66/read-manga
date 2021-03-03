import React from 'react';
import Filter from './Filter';
import Manga from './Manga';
import Search from '../layout/Search';

const Mangas = () => {
  return (
    <div>
      <Search />
      <Filter />
      <a href='#'>Add Manga</a>
      <Manga />
      <Manga />
      <Manga />
    </div>
  )
}

export default Mangas;