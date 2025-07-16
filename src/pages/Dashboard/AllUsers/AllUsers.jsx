import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const { data: users = [], refetch } = useQuery({
    queryKey: ['all-users', query],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${query}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const handleRoleChange = async (userId, newRole) => {
    const confirm = await Swal.fire({
      title: 'Change role?',
      text: `Are you sure you want to set role to ${newRole}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/users/role/${userId}`, {
        role: newRole,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'Role updated', 'success');
        refetch();
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Set Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || 'student'}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleRoleChange(user._id, 'admin')}
                  >
                    Admin
                  </button>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleRoleChange(user._id, 'tutor')}
                  >
                    Tutor
                  </button>
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() => handleRoleChange(user._id, 'student')}
                  >
                    Student
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
