import React, { useState, useEffect } from 'react';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";

function Reservations() {
    const [reservationData, setReservationData] = useState([]);
    const [token, setToken] = useState(localStorage.token);
    const [copy, setCopy] = useState();
    const [loan, setLoan] = useState();

    function getPendingReservations() {
        const token = "tychotoken" // TODO: UPDATE TOKEN
        fetch("http://localhost:8082/reservation/pending", {
            method: 'get',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            }
        }).then(res => res.json()).then(data => setReservationData(data))
    }

    function approveReservation(reservation, toApprove){
      const token = "admin" // TODO: UPDATE TOKEN

      console.log("Called method");

      // Get random copy
      fetch(`http://localhost:8082/book/getrandomcopy/${reservation.book.id}`, {
            method: 'get',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            }
        }).then(res => res.json()).then(copy => setCopy(copy))

        console.log(`${copy.id}`);

      // Approve / deny reservation with given copy
      fetch(`http://localhost:8082/reservation/approve/${reservation.id}/${copy.id}/${toApprove}`, {
          method: 'get',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
          }
      }).then(res => res.json()).then(loan => setLoan(loan))
    }

    console.log("loan gelukt joepie");

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
      <div>
        <div className="inventaris-header">
          <h4>BEKIJK OVERZICHT</h4>
          <h2>Openstaande reserveringen</h2>
        </div>
        <table className="inventaris-table">
          <thead>
            <tr>
              <th>Book title</th>
              <th>Author</th>
              <th>User</th>
              <th>Update</th>
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