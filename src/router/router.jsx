import {
    createBrowserRouter,
    
  } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import StudySessions from "../pages/Home/StudySession/StudySessions";


  

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
loader: () => fetch('./sessions.json')
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
    }
  ]);