import { useContext, useState, useEffect } from "react";
import AuthContext from "../store/auth-context";
import "../styles/mainAdmin.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { fetchFromApi } from "./FetchFromApi";

function AdminLoanOverview() {
  const auth = useContext(AuthContext);
  const [loanData, setLoanData] = useState([]);

  function getActiveLoans() {
    fetchFromApi(`loan/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((data) => setLoanData(data));
  }

  function endLoan(loan) {
    fetchFromApi(`loan/end/${loan.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then(() => {
      getActiveLoans();
    });
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
        <td>{loan.user.firstName + loan.user.lastName}</td>
        <td className="table-buttons">
          <span onClick={() => endLoan(loan)}>
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
              <th>Titel</th>
              <th>Kopie id</th>
              <th>Werknemer</th>
              <th>
                <center>Beëindig lening</center>
              </th>
            </tr>
          </thead>
          <tbody>{listItemsTable}</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLoanOverview;
