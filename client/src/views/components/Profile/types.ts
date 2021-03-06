import React from 'react';

export type ContainerProps = {
  children: React.ReactNode
}

export type AuthProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean
  },
  children: React.ReactNode
}

export type ReadingsProps = {
  manga: {
    isLoading: boolean,
    manga: Array<{
      _id: string,
      title: string,
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

export type SettingsProps = {
  auth : {
    isLoading: boolean,
    user: {
      email: string,
      accessLevel: string
    } | null
  },
  children: React.ReactNode
}
