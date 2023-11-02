import { useState } from 'react'
import BookEdit from './BookEdit';

function BookShow({ book, onDelete, onEdit }) {

  const [bookEdit, setBookEdit] = useState(false);

  const handleDeleteClick = () => {
    onDelete(book.id);
  };

  const handleEditClick = () => {
    setBookEdit(!bookEdit);
  }

  const handleSubmit = (id, newTitle) => {
    setBookEdit(false);
    onEdit(id, newTitle)
  }

  let content = <h3>{book.title}</h3>
  if (bookEdit)  {
    content = <BookEdit book={book} onSubmit={handleSubmit}/>
  }

  return (
    <div className="book-show">
      <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt="book-photo" />
      {content}
    <div className="actions">
      <button className="edit" onClick={handleEditClick}>
        Edit
      </button>
      <button className="delete" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
    </div>
  )
}

export default BookShow;