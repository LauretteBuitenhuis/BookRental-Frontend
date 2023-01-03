import React, { useState, useEffect } from 'react';


function UserBookOverview() {
  const [bookData, setBookData] = useState([]);

  function getAllBooks() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/book/all`).then(res => res.json()).then(data => setBookData(data))
  }

  useEffect(() => {
    getAllBooks()
  }, [])

  const listItemsTable =
    bookData &&
    bookData
      .map(book => (
        <tr key={book.id} >
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.isbn}</td>
        </tr>
      ))

  return (
    <div className="inventaris-container">

      <div className="bookoverview-container">
        <div className="inventaris-header">
          <h4>BEKIJK INVENTARIS</h4>
          <h2>Inventaris</h2>
        </div>
        <div className="bookoverview-searchbar">
          <input type='text' placeholder="Zoek..." />
          <div><label>
            Beschikbaar:
            <input
              name="isAvailable"
              type="checkbox"
              defaultChecked={true}
            />
          </label></div>
          <div>  <label>Sorteren op:</label><select defaultValue="relevantie">
            <option value="locatie">Locatie</option>
            <option value="beschikbaarheid">Beschikbaarheid</option>
            <option value="pagina">Pagina's</option>
            <option value="relevantie">Relevantie</option>
          </select></div>
        </div>
        <table className="bookoverview-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Isbn</th>
            </tr>
          </thead>
          <tbody>
            {listItemsTable}
          </tbody>
        </table>

      </div>
      </div>
  )
}

export default UserBookOverview