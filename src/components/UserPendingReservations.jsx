import { useContext, useState, useEffect } from "react";
import AuthContext from "../store/auth-context";
import "../styles/mainAdmin.css";
import { fetchFromApi } from "../store/fetchFromApi";

function UserPendingReservations() {
  const auth = useContext(AuthContext);
  const [reservationData, setReservationData] = useState([]);

  function getActiveReservations() {
    fetchFromApi(`reservation/pending/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((data) => setReservationData(data));
  }

  useEffect(() => {
    getActiveReservations();
  }, []);

  const listItemsTable =
    reservationData &&
    reservationData.map((reservation) => (
      <tr key={reservation.id}>
        <td>{reservation.book.title}</td>
        <td>{reservation.book.author}</td>
        <td>{reservation.status}</td>
      </tr>
    ));

  return (
    <div className="inventaris-container">
      <div className="bookoverview-container">
        <table className="bookoverview-table">
          <thead>
            <tr className="green">
              <th>Titel</th>
              <th>Autheur</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{listItemsTable}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UserPendingReservations;
