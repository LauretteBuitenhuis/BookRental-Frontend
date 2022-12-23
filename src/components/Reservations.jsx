import React, { useState, useEffect } from 'react';

function Reservations() {
    const [reservationData, setReservationData] = useState([]);

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

    useEffect(() => {
        getPendingReservations()
      }, [])

    const listItemsTable =
    reservationData &&
    reservationData
      .map(reservation => (
        <tr key={reservation.id}>
          <td>{reservation.book.title}</td>
          <td>{reservation.user.firstName + " " + reservation.user.lastName}</td>
          <td className="table-buttons">
            {/* <button className="request-button" onClick={() => addLoan(reservation)}> Accepteren </button>
            <button className="request-button" onClick={() => deleteReservation(reservation.id)}> Annuleren </button> */}
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
              <th>User</th>
              <th></th>
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