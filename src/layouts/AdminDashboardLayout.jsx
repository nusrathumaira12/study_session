import { Outlet, NavLink } from 'react-router';

const AdminDashboardLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-base-200 min-h-screen p-4">
        <ul className="space-y-2">
          <li><NavLink to="/admin-dashboard/users">View All Users</NavLink></li>
          <li><NavLink to="/admin-dashboard/sessions">View All Sessions</NavLink></li>
          <li><NavLink to="/admin-dashboard/materials">View All Materials</NavLink></li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
