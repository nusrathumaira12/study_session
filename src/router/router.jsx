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
import TutorSessions from "../pages/Dashboard/TutorSession/TutorSessions";
import UploadMaterials from "../pages/Dashboard/UploadMaterials/UploadMaterials";
import TutorAllMaterials from "../pages/Dashboard/TutorAllMaterials/TutorAllMaterials";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllStudySessions from "../pages/Dashboard/AllStusySessions/AllStudySessions";
import AllMaterials from "../pages/Dashboard/AllMaterials/AllMaterials";
import StudentDashboardHome from "../pages/Dashboard/StudentHome/StudentHome";
import AdminDashboardHome from "../pages/Dashboard/AdminHome/AdminHome";
import TutorDashboardHome from "../pages/Dashboard/TutorDashboardHome/TutorDashboardHome";





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
        path: '/dashboard',
        Component: StudentDashboardHome
      },
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
    element: <PrivateRoute allowedRoles={['tutor']}>
      <TutorDashboardLayout></TutorDashboardLayout>
      </PrivateRoute>,
      children: [
        {
          path: '/tutor-dashboard',
          Component: TutorDashboardHome,
        },
        {
          path: 'create-session',
          Component: CreateStudySession,
        },
        { path: 'my-sessions', Component: TutorSessions },
        { path: 'upload-materials', Component: UploadMaterials },
    { path: 'all-materials', Component: TutorAllMaterials }
      ]
  },
  {
    path: '/admin-dashboard',
    element: (
      <PrivateRoute allowedRoles={['admin']}>
        <AdminDashboardLayout />
      </PrivateRoute>
    ),
    children: [

      { path: '/admin-dashboard', Component: AdminDashboardHome },
      { path: 'users', Component: AllUsers },
      { path: 'sessions', Component: AllStudySessions },
      { path: 'materials', Component: AllMaterials }
    ]
  }
  
]);