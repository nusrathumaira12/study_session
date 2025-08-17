import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CreateStudySession = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const sessionData = {
      ...data,
      tutorName: user.displayName,
      tutorEmail: user.email,
      registrationFee: 0,
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/study-sessions', sessionData);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Session created successfully!', 'success');
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow dark:bg-black">
      <h2 className="text-2xl font-bold mb-4">Create Study Session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Session Title" className="input input-bordered w-full" required />
        <input value={user?.displayName} readOnly className="input input-bordered w-full" />
        <input value={user?.email} readOnly className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Session Description" className="textarea textarea-bordered w-full" required />
        <input {...register("registrationStart")} type="date" className="input input-bordered w-full" required />
        <input {...register("registrationEnd")} type="date" className="input input-bordered w-full" required />
        <input {...register("classStart")} type="date" className="input input-bordered w-full" required />
        <input {...register("classEnd")} type="date" className="input input-bordered w-full" required />
        <input {...register("duration")} placeholder="Session Duration (e.g. 4 Weeks)" className="input input-bordered w-full" required />
        <button className="btn btn-primary w-full" type="submit">Create Session</button>
      </form>
    </div>
  );
};

export default CreateStudySession;
