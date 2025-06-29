import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql `
    query {
        allAuthors {
            name 
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql `
    query {
        allBooks {
            title
            published
            author {
              name
              born
              bookCount
            }
            genres
            id
        }
    }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
        title: $title
        published: $published
        author: $author
        genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`

export const SET_BIRTH_YEAR = gql`
  mutation updateAuthor ($name: String!, $setBornTo: Int!) {
    editAuthor (
        name: $name,
        setBornTo: $setBornTo
    ) {
        name 
        born
        bookCount
        id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql `
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const ALL_BOOKS_BY_GENRE = gql`
  query AllBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

//bookCount in set_birth year and all authors