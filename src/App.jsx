import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home = lazy(() => import("./core/public/Home"));
const Login = lazy(() => import("./core/public/Login"));
const Register = lazy(() => import("./core/public/Register"));
const VerifyOtp = lazy(() => import("./core/public/VerifyOtp"));
const Dashboard = lazy(() => import("./core/public/Dashboard"));
const UniversityDetail = lazy(() => import("./core/public/UniversityDetail"));
const CourseDetail = lazy(() => import("./core/public/CourseDetail"));
const Universities = lazy(() => import("./core/public/Universities"));
const Courses = lazy(() => import("./core/public/Courses"));
const UniversityDetailDynamic = lazy(() => import("./core/public/UniversityDetailDynamic"));
const ProfileStepper = lazy(() => import("./core/private/ProfileStepper"));

function App() {
  const [count, setCount] = useState(0)


  const publicRoutes = [
    { path: "/", element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense> },
    { path: "/login", element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
    { path: "/register", element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense> },
    { path: "/verify-otp", element: <Suspense fallback={<div>Loading...</div>}><VerifyOtp /></Suspense> },
    { path: "/dashboard", element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense> },
    { path: "/universities", element: <Suspense fallback={<div>Loading...</div>}><Universities /></Suspense> },
    { path: "/static_university/1", element: <Suspense fallback={<div>Loading...</div>}><UniversityDetail /></Suspense> },
    { path: "/university/:id", element: <Suspense fallback={<div>Loading...</div>}><UniversityDetailDynamic /></Suspense> },
    { path: "/course/:id", element: <Suspense fallback={<div>Loading...</div>}><CourseDetail /></Suspense> },
    { path: "/programs", element: <Suspense fallback={<div>Loading...</div>}><Courses /></Suspense> },
    { path: "/profile", element: <Suspense fallback={<div>Loading...</div>}><ProfileStepper /></Suspense> },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter(publicRoutes)} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </QueryClientProvider>
  );
}

export default App
