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

import DashboardLayout from "../layouts/DashboardLayout";
import Payment from "../pages/Dashboard/Payment/Payment";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import BookedSessionDetails from "../pages/Dashboard/MyBookings/BookedSessionDetails";
import CreateNote from "../pages/Dashboard/CreateNote/CreateNote";
import ManageNotes from "../pages/Dashboard/ManageNote/ManageNote";
import StudyMaterials from "../pages/Dashboard/StudyMaterials/StudyMaterials";
import TutorsPage from "../pages/Tutors/Tutors";
import TutorDashboardLayout from "../layouts/TutorDashboardLayout";
import CreateStudySession from "../pages/Dashboard/CreateStudySession/CreateStudySession";





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
path: '/tutors',
Component: TutorsPage
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

      },
      {
        path: '/payment/:sessionId',
        Component: Payment
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
    element: <PrivateRoute allowedRoles={['student']}><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'my-bookings',
        Component: MyBookings
      },
      {
        path:"/dashboard/booked-sessions/:id",
        Component: BookedSessionDetails
      },
      {
        path: "create-note",
        Component: CreateNote
      },{
        path: 'manage-notes',
        Component: ManageNotes

      },{
        path: '/dashboard/study-materials',
       Component: StudyMaterials
      }
      
      
    ]
  },

  {
    path: "/tutor-dashboard",
    Component: <PrivateRoute allowedRoles={['tutor']}>
      <TutorDashboardLayout></TutorDashboardLayout>
      </PrivateRoute>,
      children: [
        {
          path: 'create-session',
          Component: CreateStudySession,
        },
        { path: 'my-sessions', Component: ViewMySessions },
        { path: 'upload-materials', Component: UploadMaterials },
    { path: 'all-materials', Component: ViewMaterials }
      ]
  },
  {
    path: '/admin-dashboard',
    element: <PrivateRoute allowedRoles={['admin']}><AdminDashboardLayout /></PrivateRoute>,
    children: [
      { path: 'users', Component: ManageUsers },
      { path: 'sessions', Component: ManageSessions },
      // etc.
    ]
  }
]);