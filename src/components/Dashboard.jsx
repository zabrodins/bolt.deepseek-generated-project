export default function Dashboard({ user }) {
      return (
        <div className="dashboard">
          <h2>Welcome, {user?.email}</h2>
          <div className="finance-overview">
            <h3>Your Finances</h3>
            {/* Finance tracking components will go here */}
          </div>
        </div>
      );
    }
