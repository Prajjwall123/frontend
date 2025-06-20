import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home = lazy(() => import("./core/public/Home"));

function App() {
  const [count, setCount] = useState(0)


  const publicRoutes = [
    { path: "/", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter(publicRoutes)} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </QueryClientProvider>
  );
}

export default App
