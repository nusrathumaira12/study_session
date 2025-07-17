import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Login = () => {
  const { signIn } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ call the hook properly
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      const loggedInEmail = result.user.email;

      // ✅ Get role from backend
      const res = await axiosSecure.get(`/users/${loggedInEmail}`);
      const role = res.data.role;
      console.log('✅ Logged in role:', role);

      // ✅ Role-based redirect
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'tutor') {
        navigate('/tutor-dashboard');
      } else {
        navigate('/dashboard'); // student
      }
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Please Log In</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && <p className='text-red-500'>Email is required</p>}

            <label className="label mt-4">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button type="submit" className="btn text-white bg-blue-500 mt-4">Login</button>
          </fieldset>
        </form>

        <p className="mt-4">
          <small>New to this website? <Link to="/signUp" className='link link-primary'>Sign Up</Link></small>
        </p>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;