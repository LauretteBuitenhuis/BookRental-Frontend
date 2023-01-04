import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Reserve from "../assets/ic_archive_24px.png";
import AuthContext from "../store/auth-context";
import logOutIcon from "../assets/ic_exit_to_app_24px.png";
import UserIcon from "../assets/ic_account_box_24px_user.png";
import "../styles/inventory.css";

function UserBookOverview() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };

  const [bookData, setBookData] = useState([]);

  function getAllBooks() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/book/all`)
      .then((res) => res.json())
      .then((data) => setBookData(data));
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  const listItemsTable =
    bookData &&
    bookData.map((book) => (
      <tr key={book.id}>
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.isbn}</td>
        <td></td>
        <td>
          <button>
            <img src={Reserve} alt="reserve" />
          </button>
        </td>
      </tr>
    ));

  return (
    <div>
      <div>
        <div className="bookoverview-container">
          <div className="bookoverview-header">
            <h4>BEKIJK INVENTARIS</h4>
            <h2>Inventaris</h2>
          </div>

          <nav className="bookoverview-navbar">
            <img src={UserIcon} alt="Admin" />
            <span>Voornaam Achternaam</span>
            <button>
              <img src={logOutIcon} alt="log out" onClick={logoutHandler} />
            </button>
          </nav>
        </div>

        <div className="bookoverview-searchbar">
          <input type="text" placeholder="Zoek..." />
          <div>
            <label>
              Beschikbaar:
              <input name="isAvailable" type="checkbox" defaultChecked={true} />
            </label>
          </div>
          <div>
            {" "}
            <label>Sorteren op:</label>
            <select defaultValue="relevantie">
              <option value="locatie">Locatie</option>
              <option value="beschikbaarheid">Beschikbaarheid</option>
              <option value="pagina">Pagina's</option>
              <option value="relevantie">Relevantie</option>
            </select>
          </div>
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
          <tbody>{listItemsTable}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UserBookOverview;
