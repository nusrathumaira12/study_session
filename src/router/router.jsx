import {
    createBrowserRouter,
    
  } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import StudySessions from "../pages/Home/StudySession/StudySessions";
import PrivateRoute from "../routes/PrivateRoute";
import StudySessionDetails from "../pages/StudySessionDetails/StudySessionDetails";
import DashboardLsyout from "../layouts/DashboardLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MySessions from "../pages/Dashboard/MySessions/MySessions";


  

export const router = createBrowserRouter([
    {
      path: "/",
  Component: RootLayout,
  children: [
    {
        index: true,
        Component: Home
    },
    
    {
path: '/study-sessions',
Component: StudySessions,

    },
    {
      path: '/study-sessions/:id',
      element: <PrivateRoute>
        <StudySessionDetails></StudySessionDetails>
        </PrivateRoute>

    }
  ]
    },

    {
      path: '/',
      Component: AuthLayout,
      children: [
        {
          path: 'login',
          Component: Login
        },
        {
          path: 'signUp',
          Component: SignUp
        }
      ]
    },

    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
{
  path: 'my-bookings',
  Component: MySessions
}
      ]
    }
  ]);