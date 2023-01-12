import { useContext } from "react";
import AuthContext from "../store/auth-context";
import "../styles/mainAdmin.css";
import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import { render } from "@testing-library/react";

function AdminLoanOverview() {
    const auth = useContext(AuthContext);
    const [loanData, setLoanData] = useState([]);

    function getActiveLoans() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/active`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth.token,
            },
        })
            .then((res) => res.json())
            .then((data) => setLoanData(data));
    }

    function endLoan(loan) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/end/${loan.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth.token,
            },
        })
            .then((res) => {
                res.json();
                getActiveLoans();
            })
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
    )
}

export default AdminLoanOverview;