import "../styles/sortedTable.css";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MdLibraryAdd } from "react-icons/md";
import AuthContext from "../store/auth-context";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";
import { SortedTable } from "./SortedTable";

export function Inventory() {
  const auth = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState();
  const [addModus, setAddModus] = useState(false);
  const [deleteModus, setDeleteModus] = useState(false);
  const [deleteId, setDeleteId] = useState();

  function getAllBooks() {
    fetch("http://localhost:8082/book/all")
      .then((res) => res.json())
      .then((data) => setBooks(data));
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/book/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then(() => getAllBooks());
    setTitle("");
    setDeleteId();
    setDeleteModus(false);
  }

  function updateBook(book) {
    setAddModus(true);
    setUpdateModus(true);
    setUpdatedId(book.id);
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

  // TODO - filtering
  // TODO - searching
  function search() {}

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <div className="inventory-container">
        <h2>Inventaris</h2>
        <TextInput name="search" placeholder="Zoek..." onChange={search} />
        <CheckboxInput name="isAvailable" label="Beschikbaar" />
        Voeg nieuw boek toe
        <MdLibraryAdd className="addIcon" onClick={() => setAddModus(true)} />
        <SortedTable
          showDeleteModal={showDeletePopUp}
          updateFunction={updateBook}
          data={books}
          columns={[
            {
              key: "title",
              sortable: true,
            },
            {
              key: "author",
              sortable: true,
            },
            {
              key: "isbn",
              sortable: false,
            },
          ]}
        />
      </div>

      {addModus && (
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
      )}
      {deleteModus && (
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
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
