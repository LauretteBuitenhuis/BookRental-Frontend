import "../styles/inventory.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MdLibraryAdd } from "react-icons/md";
import AuthContext from "../store/auth-context";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";

// TODO - reserveren van een boek
// TODO - toggle admin/user view

export function Inventory() {
  const auth = useContext(AuthContext);

  const [bookData, setBookData] = useState({});
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
      .then((data) => setBookData(data));
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

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <div className="inventory-container">
        <h2>Inventaris</h2>
        <div className="inventory-searchbar">
          <TextInput name="search" placeholder="Zoek..." />
          <CheckboxInput name="isAvailable" label="Beschikbaar" />
          <label>Sorteren op:</label>
          <select defaultValue="relevantie">
            <option value="locatie">Locatie</option>
            <option value="beschikbaarheid">Beschikbaarheid</option>
            <option value="pagina">Pagina's</option>
            <option value="relevantie">Relevantie</option>
          </select>
          Voeg nieuw boek toe
          <MdLibraryAdd className="addIcon" onClick={() => setAddModus(true)} />
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Isbn</th>
              <th>Update</th>
            </tr>
          </thead>
        </table>
      </div>

      {addModus ? (
        <div className="inventory-add-container">
          <h2>{updateModus ? "Update Book" : "Add New Book"}</h2>
          <form
            className="form"
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
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <label>Isbn:</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => {
                setIsbn(e.target.value);
              }}
            />
            <button type="submit" className="button">
              {updateModus ? "Update Book" : "Add New Book"}
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
        <div className="inventory-add-container">
          <h2>Weet je zeker dat je {title} uit het systeem wil halen?</h2>
          <div>
            <button
              type="submit"
              className="button"
              onClick={() => deleteBook(deleteId)}
            >
              Verwijder boek
            </button>
            <button
              type="submit"
              className="button"
              onClick={() => setDeleteModus(false)}
            >
              Annuleren
            </button>{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
}
