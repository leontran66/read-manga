import React from 'react';

export type ContainerProps = {
  children: React.ReactNode
}

export type MangaProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: {
      accessLevel: string
    } | null
  },
  allGenres: {
    isLoading: boolean,
    genres: Array<{
      _id: string,
      name: string,
      manga: Array<string>
    }>
  },
  mangas: {
    isLoading: boolean,
    manga: Array<{
      _id: string,
      title: string,
      author: string,
      synopsis: string,
      chapters: number
    }>
  },
  readings: {
    isLoading: boolean,
    readings: Array<{
      _id: string,
      manga: string,
      chapter: number
    }>
  }
}

export type MangaObjectProps = {
  isNew: boolean,
  manga: {
    _id: string,
    title: string,
    author: string,
    genres: Array<string>,
    synopsis: string,
    chapters: number
  }
}
