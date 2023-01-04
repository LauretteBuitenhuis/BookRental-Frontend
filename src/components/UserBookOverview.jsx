import React, { useState, useEffect } from 'react';
import Reserve from '../assets/ic_archive_24px.png';
import { BsDownload } from "react-icons/bs";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

function UserBookOverview() {
  const [bookData, setBookData] = useState([]);
  const [reservation, setReservation] = useState();

  const auth = useContext(AuthContext);

  function getAllBooks() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/book/all`).then(res => res.json()).then(data => setBookData(data))
  }

  function createReservation(book) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/reservation/create/${book.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.token,
      }
    }).then(res => res.json()).then(reservation => {
      setReservation(reservation)
    })
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
          <td></td>
          <td className="table-buttons">
          <span onClick={() => createReservation(book)}><BsDownload className="icon"/></span></td>      
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
              <th>Beschikbaarheid</th>
              <th>Reserveer</th>
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