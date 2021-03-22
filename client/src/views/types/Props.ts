import React from 'react';
import { RouteProps } from 'react-router';
import { Alert } from '../../state/ducks/alerts/types';
import { Manga } from '../../state/ducks/manga/types';
import { Reading } from '../../state/ducks/readings/types';

export type PrivateProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean
  },
  component: React.ElementType
} & RouteProps;

export type AlertProps = {
  alerts: Array<Alert>
}

export interface GuestProps extends AlertProps {
  auth: {
    isAuthenticated: boolean
  }
};

export type EnhancedProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: {
      email: string,
      accessLevel: string
    } | null
  }
};

export type ReadingProps = {
  manga: Array<Manga>,
  readings: {
    readings: Array<Reading>,
    isLoading: boolean
  }
}

export interface CreateReadingProps extends AlertProps {
  manga: Array<{ title: string }>
}

export interface EditReadingProps extends AlertProps {
  reading: {
    title: string,
    chapter: number
  }
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
