import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books')
    setBooks(response.data);
  }

  useEffect(() => {
    fetchBooks()
    },[])

  const deleteBookById = async (id) => {

    const response = await axios.delete(`http://localhost:3001/books/${id}`)

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  }

  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title: title
    })
    const updatedBooks = [
      ...books, response.data
    ]
    setBooks(updatedBooks);
  }

    const editBookById = async (id, newTitle) => {

      const response = await axios.put(`http://localhost:3001/books/${id}`, {
        title: newTitle,
      })

      const updatedBook = books.map((book) => {
        if (book.id === id) {
          return {...book, ...response.data}
      }
      return book  
      })
      setBooks(updatedBook);
    }

  return (
    <div className="app">
      <h1>Reading Lists</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
      <BookCreate onCreate={createBook}/>
    </div>
  )
}

export default App
