import React from 'react';
import { RouteProps } from 'react-router';
import { Alert } from '../../state/ducks/alerts/types';

export type GuestProps = {
  alerts: Array<Alert>,
  auth: {
    isAuthenticated: boolean
  }
};

export type PrivateProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean
  },
  component: React.ElementType
} & RouteProps;

export type EnhancedProps = {
  auth: {
    isAuthenticated: boolean,
    user: {
      email: string,
      accessLevel: string
    } | null
  }
};
