import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <div className="dashboard-panel">
      <div className="summary-title">User links</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/user/profile">
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/user/orders">
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
