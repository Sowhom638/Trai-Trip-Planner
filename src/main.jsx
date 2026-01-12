import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'
import Create_Trip from './pages/Create_Trip.jsx'
import History from './pages/History.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import TripDetailPage from './pages/TripDetailPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/history",
    element: (<ProtectedRoute><History/></ProtectedRoute>)
  },
  {
    path: "/trips/:tripId",
    element: (<ProtectedRoute><TripDetailPage/></ProtectedRoute>)
  },
  {
    path: "/create-trip",
    element: <Create_Trip/>
  }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="709500510086-t8rcrn01o4rp42mcffkqhf0opmea9fl3.apps.googleusercontent.com">
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)

