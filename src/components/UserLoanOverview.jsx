import { useContext, useState, useEffect } from "react";
import AuthContext from "../store/auth-context";
import "../styles/mainAdmin.css";
import { fetchFromApi } from "./FetchFromApi";

function UserLoanOverview() {
  const auth = useContext(AuthContext);
  const [loanData, setLoanData] = useState([]);

  function getActiveLoans() {
    fetchFromApi(`loan/active/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((data) => setLoanData(data));
  }

  useEffect(() => {
    getActiveLoans();
  }, []);

  const listItemsTable =
    loanData &&
    loanData.map((loan) => (
      <tr key={loan.id}>
        <td>{loan.copy.book.title}</td>
        <td>{loan.copy.id}</td>
        <td>{loan.startDate}</td>
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
            </tr>
          </thead>
          <tbody>{listItemsTable}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UserLoanOverview;
