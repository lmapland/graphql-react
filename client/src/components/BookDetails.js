import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails(bookId) {
	const { loading, error, data } = useQuery(getBookQuery, { variables: bookId } );

  const displayBook = () => {
    if (loading) return <option disabled>Loading....</option>
    if (error) return <option disabled>Something went wrong getting the book details!</option>
    if (data && (null != data.book)) {
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            { data.book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
              })}
          </ul>
        </div>
    );}
  }

  return(
    <div id="book-details">
      <p>Output book details here</p>
      {displayBook()}
    </div>
  )
}

export default BookDetails;
