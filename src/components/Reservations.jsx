import React, { useState, useEffect } from 'react';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

export function Reservations() {
  const [reservationData, setReservationData] = useState([]);
  const [copy, setCopy] = useState();
  const [loan, setLoan] = useState();

  const auth = useContext(AuthContext);

  function getPendingReservations() {
    const token = "tychotoken" // TODO: UPDATE TOKEN
    fetch("http://localhost:8082/reservation/pending", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.token,
      }
    }).then(res => res.json()).then(data => setReservationData(data))
  }

  function approveReservation(reservation, toApprove) {

    setCopy(null);

    if (toApprove) {
      // Get random copy
      fetch(`${process.env.BACKEND_URL}/book/getrandomcopy/${reservation.book.id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token,
        }
      }).then(res => res.json()).then(copy => setCopy(copy))

    }

    // Approve / deny reservation with given copy
    fetch(`${process.env.BACKEND_URL}/reservation/approve/${reservation.id}/${copy.id}/${toApprove}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.token,
      }
    }).then(res => res.json()).then(loan => setLoan(loan))

  }

  useEffect(() => {
    getPendingReservations()
  }, [])

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