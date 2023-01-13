import "../styles/mainUser.css";
import UserLoanOverview from "../components/UserLoanOverview";
import UserLoanHistory from "../components/UserLoanHistory";
import UserPendingReservations from "../components/UserPendingReservations";

function UserPage() {
  return (
    <div className="userPage">
      <div className="adminheader-container">
        <div className="userheader">
          <h4>OVERZICHT</h4>
          <h2>Uitleningen</h2>
        </div>
      </div>

      {/* <div className="requests">
        <h5>
          Verzoeken{" "}
          <MdLibraryAdd className="icon" onClick={bookInventoryHandler} />
        </h5>
      </div> */}

      <div className="inventaris-container">
        <UserPendingReservations />

        <div className="adminheader">
          <h2>Huidige bezitten</h2>
        </div>

        <UserLoanOverview />

        <div className="adminheader">
          <h2>Geschiedenis</h2>
        </div>

        <UserLoanHistory />
      </div>
    </div>
  );
}

export default UserPage;
