import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editId, setEditId] = useState(null);
  const [editedNote, setEditedNote] = useState({ title: '', description: '' });

  const { data: notes = [], refetch } = useQuery({
    queryKey: ['notes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This note will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/notes/${id}`);
        Swal.fire('Deleted!', 'Note has been deleted.', 'success');
        refetch();
      }
    });
  };

  const handleUpdate = async () => {
    await axiosSecure.patch(`/notes/${editId}`, editedNote);
    Swal.fire('Updated!', 'Note has been updated.', 'success');
    setEditId(null);
    setEditedNote({ title: '', description: '' });
    refetch();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 mt-20">Manage Your Notes</h2>
      {
        notes.length === 0
          ? <p className='text-gray-500'>No notes available.</p>
          : notes.map(note => (
            <div key={note._id} className="bg-white border p-4 mb-4 rounded shadow">
              {editId === note._id ? (
                <>
                  <input
                    type="text"
                    value={editedNote.title}
                    onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                    className="input input-bordered w-full mb-2"
                  />
                  <textarea
                    value={editedNote.description}
                    onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                    className="textarea textarea-bordered w-full mb-2"
                  />
                  <button onClick={handleUpdate} className="btn btn-success mr-2">Save</button>
                  <button onClick={() => setEditId(null)} className="btn btn-ghost">Cancel</button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{note.title}</h3>
                  <p>{note.description}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setEditId(note._id);
                        setEditedNote({ title: note.title, description: note.description });
                      }}
                      className="btn btn-sm btn-info mr-2"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(note._id)} className="btn btn-sm btn-error">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
      }
    </div>
  );
};

export default ManageNotes;
