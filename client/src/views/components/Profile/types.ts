import React from 'react';

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

export type FormProps = {
  alerts: Array<{
    id: string,
    field: string,
    msg: string
  }>,
  isNew: boolean,
  manga: {
    isLoading: boolean,
    manga: Array<{
      _id: string,
      title: string,
      chapters: number
    }>
  },
  reading: {
    title: string,
    chapter: number
  } | null
}
