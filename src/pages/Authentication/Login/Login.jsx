import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Login = () => {
  const { signIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      const loggedInEmail = result.user.email;

      const res = await axiosSecure.get(`/users/${loggedInEmail}`);
      const role = res.data.role;
      console.log('✅ Logged in role:', role);

      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'tutor') navigate('/tutor-dashboard');
      else navigate('/dashboard');
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen   flex items-center  bg-gray-50 px-4 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 md:ml-20">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-xl text-gray-600 text-center">Please login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full mt-1"
              placeholder="••••••••"
            />
            {errors.password?.type === 'required' && <p className="text-sm text-red-500 mt-1">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-sm text-red-500 mt-1">Password must be at least 6 characters</p>}
          </div>

          <div className="text-left">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          New to this website?{' '}
          <Link to="/signUp" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>

        <div className="divider">OR</div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
