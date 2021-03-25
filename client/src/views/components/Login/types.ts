import React from 'react';

export type AlertProps = {
  alerts: Array<{
    id: string,
    field: string,
    msg: string
  }>
}

export type AuthProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean
  },
  children: React.ReactNode
}
