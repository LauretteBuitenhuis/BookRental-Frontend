import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import logOutIcon from "../assets/ic_exit_to_app_24px.png";
import EmployeesIcon from "../assets/ic_supervisor_account_24px.png";
import InventoryIcon from "../assets/BooksOverview.png";
import AdminIcon from "../assets/ic_account_box_24px_admin.png";
import "../styles/mainAdmin.css";
import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";

function AdminPage() {
  const [reservationData, setReservationData] = useState([]);
  const [copies, setCopies] = useState([]);
  const [reservation, setReservation] = useState();
  const [loan, setLoan] = useState();
  const [chooseCopyModus, setchooseCopyModus] = useState(false);

  const auth = useContext(AuthContext);

  // TODO - WIM272: error messages
  function getPendingReservations() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/reservation/pending`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setReservationData(data));
  }

  function leaveScreen() {
    setchooseCopyModus(false);
  }

  function approveReservation(reservation, toApprove) {
    if (toApprove === true) {
      /// TODO - WIM272: error messages
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/book/copy/${reservation.book.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      )
        .then((res) => res.json())
        .then((copies) => {
          setCopies(copies);

          setchooseCopyModus(true);
          setReservation(reservation);
        });
    } else {
      // TODO - WIM272: error messages
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reservation/deny/${reservation.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      )
        .then((res) => res.json())
        .then((reservation) => {
          setReservation(reservation);
          getPendingReservations();
        });
    }
  }

  // TODO - WIM272: error messages
  function createLoan(reservation, copy){
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/reservation/approve/${reservation.id}/${copy.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      }
    )
      .then((res) => res.json())
      .then((loan) => {
        setLoan(loan);
        leaveScreen();
        getPendingReservations();
      })
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
    <div className="adminPage">
      <div className="adminheader-container">
        <div className="adminheader">
          <h4>OVERZICHT</h4>
          <h2>Reserveringen</h2>
        </div>
      </div>

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

export default AdminPage;
