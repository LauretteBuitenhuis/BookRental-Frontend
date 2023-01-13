import { useContext, useState, useEffect } from "react";
import AuthContext from "../store/auth-context";
import "../styles/mainAdmin.css";
import { fetchFromApi } from "../store/fetchFromApi";

function UserLoanHistory() {
  const auth = useContext(AuthContext);
  const [loanData, setLoanData] = useState([]);

  function getHistory() {
    fetchFromApi(`loan/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((data) => setLoanData(data));
  }

  useEffect(() => {
    getHistory();
  }, []);

  const listItemsTable =
    loanData &&
    loanData.map((loan) => (
      <tr key={loan.id}>
        <td>{loan.copy.book.title}</td>
        <td>{loan.copy.id}</td>
        <td>{loan.startDate}</td>
        <td>{loan.endDate}</td>
      </tr>
    ));

  return (
    <div className="inventaris-container">
      <div className="bookoverview-container">
        <table className="bookoverview-table">
          <thead>
            <tr className="green">
              <th>Titel</th>
              <th>Kopie id</th>
              <th>Start van uitlening</th>
              <th>Eind van uitlening</th>
            </tr>
          </thead>
          <tbody>{listItemsTable}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UserLoanHistory;
