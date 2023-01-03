import "../styles/inventory.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import AuthContext from "../store/auth-context";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";

// TODO - reserveren van een boek
// TODO - toggle admin/user view

export function Inventory() {
  const auth = useContext(AuthContext);

  const [book, setBook] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState();
  const [addModus, setAddModus] = useState(false);
  const [deleteModus, setDeleteModus] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(true);

  function getAllBooks() {
    fetch("http://localhost:8082/book/all")
      .then((res) => res.json())
      .then((data) => setBook(data));
  }

  function addBook() {
    let newBook = {
      title,
      author,
      isbn,
    };
    setTitle("");
    setAuthor("");
    setIsbn("");
    fetch("http://localhost:8082/book/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(newBook),
    });
    // TODO - succes message
    setAddModus(false);
  }

  function showDeletePopUp(book) {
    setTitle(book.title);
    setDeleteId(book.id);
    setDeleteModus(true);
  }

  function deleteBook(id) {
    fetch(`http://localhost:8082/book/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    });
    setTitle("");
    setDeleteId();
    setDeleteModus(false);
  }

  function updateBook(book) {
    setAddModus(true);
    setUpdateModus(true);
    setUpdatedId(book.id);
    console.log(book);
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
  }

  function sendBookUpdate() {
    console.log("Send update");
    let newBook = {
      id: updatedId,
      title,
      author,
      isbn,
    };
    fetch(`http://localhost:8082/book/${newBook.id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(newBook),
    });
    setTitle("");
    setAuthor("");
    setIsbn("");
    setUpdatedId();
    setUpdateModus(false);
    setAddModus(false);
  }

  function leaveScreen() {
    setUpdateModus(false);
    setAddModus(false);
  }

  // TODO - WIM222: filtering
  function filter(books) {
    return (books.filter = (item) => {
      return (
        (item.author.toLowerCase().indexOf(query) !== -1 ||
          item.title.toLowerCase().indexOf(query) !== -1) &&
        (!checked || item.isAvailable)
      );
    });
  }

  {
    getAllBooks();
  }

  return (
    <div>
      <div className="inventory-container">
        <h2>Inventaris</h2>
        <TextInput name="search" placeholder="Zoek..." />
        <label>Sorteren op:</label>
        <select defaultValue="relevantie">
          <option value="title">titel</option>
          <option value="author">autheur</option>
          <option value="relevantie">relevantie</option>
          <option value="available">beschikbaarheid</option>
        </select>
        <select defaultValue="asc">
          <option value="asc">oplopend</option>
          <option value="desc">aflopend</option>
        </select>
        <CheckboxInput name="isAvailable" label="Beschikbaar" />
        Voeg nieuw boek toe
        <MdLibraryAdd className="addIcon" onClick={() => setAddModus(true)} />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Isbn</th>
              <th>Wijzig</th>
            </tr>
          </thead>
          <tbody>
            {book.map((book, key) => (
              <tr key={key}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td className="table-buttons">
                  <span onClick={() => updateBook(book)}>
                    <BsPencilFill className="icon" />
                  </span>
                  <span onClick={() => showDeletePopUp(book)}>
                    <BsTrashFill className="icon" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addModus ? (
        <div className="inventory-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (updateModus === false) {
                addBook();
              } else {
                sendBookUpdate();
              }
            }}
          >
            {" "}
            <label>Titel:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Auteur:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <label>ISBN:</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => {
                setIsbn(e.target.value);
              }}
            />
            <button type="submit" className="button">
              {updateModus ? "Bijwerken" : "Als nieuw boek toevoegen"}
            </button>
            <button
              type="submit"
              className="button"
              onClick={() => leaveScreen()}
            >
              Annuleren
            </button>
          </form>
        </div>
      ) : null}
      {deleteModus ? (
        <div className="inventory-container">
          <div className="pop-up">
            <h3>Weet je zeker dat je {title} uit het systeem wil halen?</h3>
            <div>
              <button
                type="submit"
                className="button"
                onClick={() => deleteBook(deleteId)}
              >
                Ja, verwijder boek
              </button>
              <button
                type="submit"
                className="button"
                onClick={() => setDeleteModus(false)}
              >
                Nee, annuleren
              </button>{" "}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
