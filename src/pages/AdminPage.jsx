import "../styles/mainAdmin.css";
import ReservationOverview from '../components/ReservationOverview';
import AdminLoanOverview from '../components/AdminLoanOverview';

function AdminPage() {

  return (
    <div className="adminPage">
      <div className="adminheader-container">
        <div className="adminheader">
          <h4>OVERZICHT</h4>
          <h2>Reserveringen</h2>
        </div>
      </div>

      <div className="inventaris-container">
            <ReservationOverview />
            <AdminLoanOverview />
      </div>
    </div>
  )
};

export default AdminPage;
