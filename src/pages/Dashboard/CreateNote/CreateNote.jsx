import React, { useState } from 'react';


import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = {
      email: user.email,
      title,
      description
    };

    try {
      const res = await axiosSecure.post('/notes', note);
      if (res.data.insertedId) {
        setTitle('');
        setDescription('');
  
        Swal.fire({
          title: 'Success!',
          text: 'Note created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create note.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
   <div>
    <p className='text-3xl font-bold text-center items-center mt-20'>Create Your Note</p>
     <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl mx-20  mt-10 bg-white p-6 rounded shadow dark:bg-black">
      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Create Note
      </button>
    </form>
   </div>
  );
};

export default CreateNote;
