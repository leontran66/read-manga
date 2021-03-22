# Read Manga

### An app that keeps track of manga you are currently reading

## Stack

- NodeJS/Express Backend
- React/Redux Frontend
- MongoDB/Mongoose Database/ODM

## Dependencies

### Server

| Dependency        | Usage                                                    |
| ----------------- | -------------------------------------------------------- |
| Bcrypt            | Hashes passwords for safe storage                        |
| Express           | Node web app framework                                   |
| Express-validator | Validates and sanitizes form inputs for express          |
| Helmet            | Sets various headers for security                        |
| JSONWebToken      | Encodes/signs information in order to authorize requests |
| Mongoose          | ODM for MongoDB                                          |

### Client

| Dependency   | Usage                                   |
| ------------ | --------------------------------------- |
| Axios        | Library to make requests to the API     |
| React        | Library for creating the user interface |
| React Router | Library for declaring routes in react   |
| Redux        | Library to manage state for React       |
| Uuid         | Creates ids                             |

## Database Structure

### User

| Field       | Additional Info   |
| ----------- | ----------------- |
| email       |
| password    | Hash              |
| accessLevel | 'admin' or 'user' |

### Manga

| Field    | Additional Info |
| -------- | --------------- |
| title    |
| author   |
| synopsis |
| chapters |

### Readings

| Field   | Additional Info    |
| ------- | ------------------ |
| user    | Reference to user  |
| manga   | Reference to manga |
| chapter |

### Genres

| Field | Additional Info    |
| ----- | ------------------ |
| manga | Reference to manga |
| name  |

## Routes

### /auth

| Route              |         |
| ------------------ | ------- |
| / GET current user | Private |
| / POST login user  | Public  |

### /users

| Route                |         |
| -------------------- | ------- |
| / POST register user | Public  |
| / PATCH update user  | Private |
| / DELETE delete user | Private |

### /manga

| Route                    |                |
| ------------------------ | -------------- |
| / GET all manga          | Public         |
| /:id GET manga           | Public         |
| / POST create manga      | Private, Admin |
| /:id PATCH update manga  | Private, Admin |
| /:id DELETE delete manga | Private, Admin |

### /readings

| Route                       |         |
| --------------------------- | ------- |
| / GET get readings for user | Private |
| / POST create reading       | Private |
| /:id PATCH update reading   | Private |
| /:id DELETE delete reading  | Private |

### /genres

| Route                    |                |
| ------------------------ | -------------- |
| / GET get all genres     | Private, Admin |
| / POST create genre      | Private, Admin |
| /:id PATCH update genre  | Private, Admin |
| /:id DELETE delete genre | Private, Admin |
