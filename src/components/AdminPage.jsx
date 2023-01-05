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
  const [copy, setCopy] = useState();
  const [reservation, setReservation] = useState();
  const [loan, setLoan] = useState();

  const auth = useContext(AuthContext);

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

  function approveReservation(reservation, toApprove) {
    if (toApprove === true) {
      // Get random copy
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/book/getrandomcopy/${reservation.book.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      )
        .then((res) => res.json())
        .then((copy) => {
          setCopy(copy);

          // Check if copy is available
          if (copy !== null && copy !== undefined) {
            // Approve / deny reservation with given copy
            fetch(
              `${process.env.REACT_APP_BACKEND_URL}/reservation/approve/${reservation.id}/${copy.id}`,
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
                getPendingReservations();
              });
          } else {
            throw new Error("No copy is available for rental");
          }
        });
    } else {
      // Approve / deny reservation with given copy
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
    </div>
  );
}

export default AdminPage;
