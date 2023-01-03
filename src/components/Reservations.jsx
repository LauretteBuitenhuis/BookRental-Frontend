import React, { useState, useEffect } from 'react';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

export function Reservations() {
  const [reservationData, setReservationData] = useState([]);
  const [copy, setCopy] = useState();
  const [reservation, setReservation] = useState();
  const [loan, setLoan] = useState();

  const auth = useContext(AuthContext);

  function getPendingReservations() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/reservation/pending`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.token,
      }
    }).then(res => res.json()).then(data => setReservationData(data))
  }

  function approveReservation(reservation, toApprove) {

    if (toApprove === true) {
      // Get random copy
      fetch(`${process.env.REACT_APP_BACKEND_URL}/book/getrandomcopy/${reservation.book.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token,
        }
      }).then(res => res.json()).then(copy => {
        setCopy(copy)

        // Check if copy is available
        if (copy !== null && copy !== undefined) {
          // Approve / deny reservation with given copy
          fetch(`${process.env.REACT_APP_BACKEND_URL}/reservation/approve/${reservation.id}/${copy.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': auth.token,
            }
          }).then(res => res.json()).then(loan => {
            setLoan(loan)
            getPendingReservations()
          })
        }
        else {
          throw new Error("No copy is available for rental");
        }
      })
    }

    else {
      // Approve / deny reservation with given copy
      fetch(`${process.env.REACT_APP_BACKEND_URL}/reservation/deny/${reservation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token,
        }
      }).then(res => res.json()).then(reservation => {
        setReservation(reservation)
        getPendingReservations()
      })
    }
  }

  useEffect(() => {
    getPendingReservations()
  })

  const listItemsTable =
    reservationData &&
    reservationData
      .map(reservation => (
        <tr key={reservation.id}>
          <td>{reservation.book.title}</td>
          <td>{reservation.book.author}</td>
          <td>{reservation.user.firstName + " " + reservation.user.lastName}</td>
          <td className="table-buttons">
            <span onClick={() => approveReservation(reservation, true)}><BsFillCheckCircleFill className="icon" /></span>
            <span onClick={() => approveReservation(reservation, false)}><BsFillXCircleFill className="icon" /></span>
          </td>
        </tr>
      ))

  return (
    <div className="inventaris-container">

      <div className="bookoverview-container">
        <div className="inventaris-header">
          <h4>OVERZICHT RESERVERINGEN</h4>
          <h2>Lopende aanvragen</h2>
        </div>
        <table className="bookoverview-table">
          <thead>
            <tr>
              <th>Boek titel</th>
              <th>Auteur</th>
              <th>Medewerker</th>
              <th><center>Update</center></th>
            </tr>
          </thead>
          <tbody>
            {listItemsTable}
          </tbody>
        </table>

      </div>
    </div>
  )
}
export default Reservations