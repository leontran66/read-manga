export interface Props {
  isAuthenticated: boolean,
  isLoading: boolean
}

export interface ProfileProps extends Props {
  auth: {
    user: {
      email: string
    } | null
  }
}
