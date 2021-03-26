import React from 'react';

export type AuthProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: {
      accessLevel: string
    } | null
  },
  children: React.ReactNode
}

export type GenresProps = {
  genres: {
    isLoading: boolean,
    genres: Array<{
      _id: string,
      name: string,
      manga: Array<string>,
    }>
  }
}
