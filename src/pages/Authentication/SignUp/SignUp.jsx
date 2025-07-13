import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router'; // ✅ FIXED
import SocialLogin from '../SocialLogin/SocialLogin';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = data => {
    const { name, email, photo, password, role } = data;

    createUser(email, password)
      .then(result => {
        const loggedUser = result.user;

        updateUserProfile(name, photo)
          .then(() => {
            const newUser = {
              name,
              email,
              photo,
              role: role || 'student'
            };

            console.log('🚀 New User to Save:', newUser); // ✅ Debug log

            axiosSecure.post('/users', newUser)
              .then(res => {
                if (res.data.insertedId) {
                  toast.success('User registered successfully!');
                  navigate(from, { replace: true }); // ✅ FIXED
                } else {
                  toast.error('Failed to save user to database.');
                }
              })
              .catch(err => {
                toast.error('Database error');
                console.error(err);
              });
          })
          .catch(err => {
            toast.error('Profile update failed');
            console.error(err);
          });
      })
      .catch(error => {
        toast.error(error.message);
        console.error(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl my-10">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Create an account!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
          <div>
            <label className="label">Name</label>
            <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" placeholder="Full Name" />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input type="text" {...register('photo', { required: true })} className="input input-bordered w-full" placeholder="Photo URL" />
            {errors.photo && <p className="text-red-500">Photo is required</p>}
          </div>

          <div>
            <label className="label">Email</label>
            <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" placeholder="Email" />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <div>
            <label className="label">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered w-full" placeholder="Password" />
            {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-500">Minimum 6 characters</p>}
          </div>

          <div>
            <label className="label">Role</label>
            <select {...register('role')} className="select select-bordered w-full">
              <option value="student">Student (Default)</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">Sign Up</button>

          <p className="text-center">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">Log In</Link>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default SignUp;
