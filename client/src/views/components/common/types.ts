export type AlertProps = {
  alerts: Array<{
    id: string,
    field: string,
    msg: string
  }>
}

export type ContainerProps = {
  children: React.ReactNode
}

export type GenreFormProps = {
  alerts: Array<{
    id: string,
    field: string,
    msg: string
  }>,
  isNew: boolean,
  genre: {
    _id: string,
    name: string
    manga: Array<string>
  }
}

export type HeaderProps = {
  auth: {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: {
      accessLevel: string
    } | null
  }
}

export type MangaFormProps = {
  alerts: Array<{
    id: string,
    field: string,
    msg: string
  }>,
  isNew: boolean,
  genres: {
    genres: Array<{
      _id: string,
      name: string,
      manga: Array<string>
    }>,
    isLoading: boolean
  },
  manga: {
    _id: string,
    title: string,
    author: string,
    synopsis: string,
    chapters: number
  }
}

export type ReadingFormProps = {
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
    manga: string,
    title: string,
    chapter: number
  } | null
}
