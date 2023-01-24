import "../styles/sortedTable.css";
import "../styles/mainAdmin.css";
import "../styles/inventory.css";
import AuthContext from "../store/auth-context";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { SortedTable } from "../components/SortedTable";
import { AdminButton } from "../components/AdminButton";
import { fetchFromApi } from "../store/fetchFromApi";
import { toast } from "react-toastify";

export function Inventory() {
  const auth = useContext(AuthContext);

  const [allBooks, setAllBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [isbn, setIsbn] = useState("");
  const [updateModus, setUpdateModus] = useState(false);
  const [updatedId, setUpdatedId] = useState();
  const [addModus, setAddModus] = useState(false);
  const [deleteModus, setDeleteModus] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [reservation, setReservation] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  function createReservation(book) {
    fetchFromApi(`reservation/create/${book.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(book.id, auth.token),
    })
      .then(() => toast.success(`Reservering aangevraagd!`))
      .then((reservation) => {
        setReservation(reservation);

        if (!auth.isAdmin) {
          getAllNonReservedByUserBooks();
        }
      });
  }

  function getAllBooks() {
    fetchFromApi(`book/all`).then((data) => {
      
      // create array of max 3 tags from the tags object
      Object.values(data).map(item => {
        return item.tags.map(key => key.name).length<=3 ?
          item.labels = item.tags.map(key => key.name).join(' , ') 
              : item.labels = item.tags.map(key => key.name).slice(0,3).join(' , ')
      })

      setAllBooks(data);
      setSearchedBooks(data);
    });
    
  }

  // TODO - fix books reloading at refresh
  function getAllNonReservedByUserBooks() {
    fetchFromApi(`book/all/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((data) => {
      setAllBooks(data);
    });
  }

  function addBook() {
    let newBook = {
      title,
      author,
      isbn,
      tags,
    };


    setTitle("");
    setAuthor("");
    setIsbn("");
    setTags([]);

    fetchFromApi(`book/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(newBook),
    })
      .then(() => toast.success(`Boek toegevoegd.`))
      .then(() => getAllBooks());
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
    })
      .then(() => toast.success(`Boek verwijderd.`))
      .then(() => getAllBooks());
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
    setTags(book.tags.map(tag => tag.name));
  }

  function sendBookUpdate() {
    let newBook = {
      id: updatedId,
      title,
      author,
      isbn,
      tags,
    };

    fetchFromApi(`book/${newBook.id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(newBook),
    })
      .then(() => toast.success(`Boek geüpdatet.`))
      .then(() => getAllBooks());
    setTitle("");
    setAuthor("");
    setIsbn("");
    setUpdatedId();
    setTags([]);
    setUpdateModus(false);
    setAddModus(false);
  }

  function leaveScreen() {
    setUpdateModus(false);
    setAddModus(false);
  }

  function search(e) {
    const searchBooks = allBooks.filter(book => {

      if (e.target.value === '') return allBooks
      
      if(book.tags.filter(tag => {return tag.name.includes(e.target.value.toLowerCase())}).length>0) return book.tags

      return (book.author.toLowerCase().includes(e.target.value.toLowerCase()) || 
            book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            book.isbn.toLowerCase().includes(e.target.value.toLowerCase())) 
    })

    setSearchTerm(e.target.value);
    setSearchedBooks(searchBooks);
  }

  useEffect(() => {
    auth.isAdmin ? getAllBooks() : getAllNonReservedByUserBooks();
  }, []);

  return (
    <div>
      <div className={auth.isAdmin ? "inventory-container red" : "inventory-container green"}>
        <div className="bookoverview-container">
          <div>
            <h4>BEKIJK INVENTARIS</h4>
            <h3>Boeken</h3>
          </div>
        </div>
          <input type="search" placeholder="Zoek..." value={searchTerm} onChange={search} />
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
          data={searchedBooks}
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
            {
              key: "labels",
              sortable: false,
            }
          ]}
        />
      </div>

      {addModus && (
        <div className={auth.isAdmin ? "inventory-container red" : "inventory-container green"}>
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
            <label>Tags: <i>tag1,tag2,...,tagN</i></label>
            <input
              type="text"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value.split(","));
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
        <div className={auth.isAdmin ? "inventory-container red" : "inventory-container green"}>
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
