import React from 'react';
import { Alert } from '../../state/ducks/alerts/types';
import { Genre } from '../../state/ducks/genres/types';
import { Manga } from '../../state/ducks/manga/types';
import { Reading } from '../../state/ducks/readings/types';

export type ContainerProps = {
  children: React.ReactNode
}

export type AlertProps = {
  alerts: Array<Alert>
}

export interface AuthProps extends AlertProps {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean
  }
}

export interface EnhancedProps extends AuthProps {
  user: {
    email: string,
    accessLevel: string
  } | null
};

export interface AllGenresProps extends EnhancedProps {
  genres: {
    genres: Array<Genre>,
    isLoading: boolean
  }
}

export interface GenreProps extends AlertProps {
  genre: Genre
}

export interface AllMangaProps extends EnhancedProps {
  manga: {
    manga: Array<Manga>,
    isLoading: boolean
  },
  readings: Array<Reading>
}

export interface MangaResultProps extends EnhancedProps {
  manga: Manga,
  hasReading: boolean
}

export interface MangaProps extends EnhancedProps {
  manga: {
    isLoading: boolean,
    manga: Array<Manga>
  },
  readings: Array<Reading>
}
