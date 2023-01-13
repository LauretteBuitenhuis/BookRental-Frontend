import { useContext, useState, useEffect } from "react";
import AuthContext from "../store/auth-context";
import "../styles/mainAdmin.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";

function ReservationOverview() {
  const auth = useContext(AuthContext);

  const [reservationData, setReservationData] = useState([]);
  const [copies, setCopies] = useState([]);
  const [reservation, setReservation] = useState();
  const [loan, setLoan] = useState();
  const [chooseCopyModus, setchooseCopyModus] = useState(false);

  function getPendingReservations() {
    fetchFromApi("reservation/pending", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((data) => setReservationData(data));
  }

  function leaveScreen() {
    setchooseCopyModus(false);
  }

  function approveReservation(reservation, toApprove) {
    if (toApprove === true) {
      fetchFromApi(`book/copy/${reservation.book.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      }).then((copies) => {
        setCopies(copies);

        setchooseCopyModus(true);
        setReservation(reservation);
      });
    } else {
      fetchFromApi(`reservation/deny/${reservation.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      }).then((reservation) => {
        setReservation(reservation);
        getPendingReservations();
      });
    }
  }

  function createLoan(reservation, copy) {
    fetchFromApi(`reservation/approve/${reservation.id}/${copy.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((loan) => {
      setLoan(loan);
      leaveScreen();
      getPendingReservations();

      // TODO: Call refresh of active loans upon creating new loan
      // AdminLoanOverview.getActiveLoans();
    });
  }

  useEffect(() => {
    getPendingReservations();
  }, []);

  const listItemsTable =
    reservationData &&
    reservationData.map((reservation) => (
      <tr key={reservation.id}>
        <td>{reservation.book.title}</td>
        <td>{reservation.book.author}</td>
        <td>{reservation.user.firstName + " " + reservation.user.lastName}</td>
        <td className="table-buttons">
          <span onClick={() => approveReservation(reservation, true)}>
            <BsFillCheckCircleFill className="icon" />
          </span>
          <span onClick={() => approveReservation(reservation, false)}>
            <BsFillXCircleFill className="icon" />
          </span>
        </td>
      </tr>
    ));

  const listCopies =
    copies &&
    copies.map((copy) => (
      <tr key={copy.id}>
        <td>{copy.id}</td>
        <td>{copy.book.title}</td>
        <td>{copy.book.author}</td>
        <td className="table-buttons">
          <span onClick={() => createLoan(reservation, copy)}>
            <BsFillCheckCircleFill className="icon" />
          </span>
        </td>
      </tr>
    ));

  return (
    <div className="inventaris-container">
      <div className="bookoverview-container">
        <table className="bookoverview-table">
          <thead>
            <tr className="red">
              <th>Boek titel</th>
              <th>Auteur</th>
              <th>Medewerker</th>
              <th>
                <center>Update</center>
              </th>
            </tr>
          </thead>
          <tbody>{listItemsTable}</tbody>
        </table>
      </div>

      {chooseCopyModus && (
        <div className="inventory-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {" "}
            <div className="inventaris-container">
              <div className="bookoverview-container">
                <center>
                  <table className="bookoverview-table">
                    <thead>
                      <tr className="red">
                        <th>Kopie id</th>
                        <th>Boek titel</th>
                        <th>Autheur</th>
                        <th>
                          <center>Leen uit</center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>{listCopies}</tbody>
                  </table>
                </center>
              </div>
            </div>
            <center>
              <button
                type="submit"
                className="button"
                onClick={() => leaveScreen()}
              >
                Annuleren
              </button>
            </center>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReservationOverview;
