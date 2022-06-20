import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
	const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { adata, aloading, aerror }] = useMutation(addBookMutation, {
    refetchQueries: [
      { query: getBooksQuery },
    ]
  });
  if(aerror) console.log(aerror);

  const handleSubmit = (e) =>{
    e.preventDefault();
    addBook({ variables: { name: name, genre: genre, authorId: authorId } });
  }

  const displayAuthors = () =>{
    if (loading) return <option disabled>Loading....</option>
    if (error) return <option disabled>Something went wrong!</option>
    if (data) {
      return data.authors.map((author, index) => {
        return (<option key={index} value={author.id}>{author.name}</option>);
      });
    }
  }

  return( 
<form id="add-book" onSubmit={handleSubmit}>
<div className="field">
	<label>Book name:</label>
	<input type="text" value={name} onChange={ (e) => setName(e.target.value) } />
</div>

<div className="field">
	<label>Genre:</label>
	<input type="text" value={genre} onChange={ (e) => setGenre(e.target.value) } />
</div>

<div className="field">
	<label>Author:</label>
	<select value={authorId} onChange={ (e) => setAuthorId(e.target.value) } >
		<option>Select Author</option>
    {displayAuthors()}
	</select>
</div>

<button>+</button>
</form>
  );
}


export default AddBook;
