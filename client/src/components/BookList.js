import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [bookId, setBookId] = useState(null);
function DisplayBooks(data, loading, error) {
  if (loading) return <p>Loading....</p>
  if (error) return <p>Something went wrong</p>
  return data.books.map(book => {
      return (
          <li key={book.id} data-value={book.id} onClick={ (e) => { setBookId(e.target.dataset.value) } }>{book.name}</li>
      );
  });
}

  const { loading, error, data } = useQuery(getBooksQuery);

  return (
    <div>
      <ul id="book-list">
        { DisplayBooks(data, loading, error) }
      </ul>
      <BookDetails bookId={bookId} />
    </div>
  );
}

export default BookList;
