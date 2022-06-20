import { gql } from '@apollo/client';


const getAuthorsQuery = gql`
{
  authors {
    id
    name
  }
}
`

const getBooksQuery = gql`
{
  books {
    id
    name
  }
}
`

const getBookQuery = gql`
query($bookId: ID) {
  book(id: $bookId) {
    id
    name
    genre
    author {
      id
      name
      age
      books {
        id
        name
      }
    }
  }
}
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`

export { getAuthorsQuery, getBooksQuery, getBookQuery, addBookMutation };
