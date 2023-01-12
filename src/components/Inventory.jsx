import "../styles/sortedTable.css";
import "../styles/mainAdmin.css";
import "../styles/inventory.css";
import AuthContext from "../store/auth-context";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TextInput } from "./TextInput";
import { SortedTable } from "./SortedTable";
import { AdminButton } from "./AdminButton";
import { fetchFromApi } from "./FetchFromApi";

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
  const [reservation, setReservation] = useState();

  function createReservation(book) {
    fetchFromApi(`reservation/create/${book.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(book.id, auth.token),
    }).then((reservation) => {
      setReservation(reservation);
      getAllNonReservedByUserBooks();
    });
  }

  function getAllBooks() {
    fetchFromApi(`book/all`).then((data) => setBooks(data));
  }

  function getAllNonReservedByUserBooks() {
    fetchFromApi(`book/all/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((data) => {
      setBooks(data);
    });
  }
  // TODO - WIM272: error messages
  function addBook() {
    let newBook = {
      title,
      author,
      isbn,
    };
    setTitle("");
    setAuthor("");
    setIsbn("");

    fetchFromApi(`book/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(newBook),
    }).then(() => getAllBooks());
    setAddModus(false);
  }

  function showDeletePopUp(book) {
    setTitle(book.title);
    setDeleteId(book.id);
    setDeleteModus(true);
  }

  function deleteBook(id) {
    fetchFromApi(`book/${id}/delete`, {
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
    let newBook = {
      id: updatedId,
      title,
      author,
      isbn,
    };

    fetchFromApi(`book/${newBook.id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(newBook),
    }).then(() => getAllBooks());
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

  // TODO - searching
  function search() {}

  useEffect(() => {
    auth.isAdmin ? getAllBooks() : getAllNonReservedByUserBooks();
  }, []);

  return (
    <div>
      <div className="inventory-container">
        <div className="bookoverview-container">
          <div>
            <h4>BEKIJK INVENTARIS</h4>
            <h3>Boeken</h3>
          </div>
        </div>
        <TextInput name="search" placeholder="Zoek..." onChange={search} />
        <div className="table-options">
          {/* 
          TODO - how to check if book is available
          <CheckboxInput name="isAvailable" label="Beschikbaar" /> */}
          <AdminButton label="Voeg nieuw boek toe" setAddModus={setAddModus} />
        </div>
        <SortedTable
          showDeleteModal={showDeletePopUp}
          updateBook={updateBook}
          createReservation={createReservation}
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
              {updateModus ? "Bijwerken" : "Toevoegen"}
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
