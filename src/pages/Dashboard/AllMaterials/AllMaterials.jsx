import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllMaterials = () => {
  const axiosSecure = useAxiosSecure();

  const { data: materials = [], refetch } = useQuery({
    queryKey: ['all-materials'],
    queryFn: async () => {
      const res = await axiosSecure.get('/materials');
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "This material will be permanently removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/materials/${id}`);
        refetch();
        Swal.fire('Deleted!', 'The material has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete the material.', 'error');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Study Materials</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Session ID</th>
              <th>Tutor Email</th>
              <th>Image</th>
              <th>Drive Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.sessionId}</td>
                <td>{item.tutorEmail}</td>
                <td>
                  <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover" />
                </td>
                <td>
                  <a href={item.driveLink} className="text-blue-500" target="_blank" rel="noreferrer">View</a>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {materials.length === 0 && (
              <tr><td colSpan="7" className="text-center py-4">No materials found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMaterials;
