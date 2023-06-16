import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Menu from "./Pages/Menu";
import Home from "./Pages/Home";
import Rooms from "./Pages/Rooms";
import GalleryPage from "./Pages/GalleryPage";
import RoomDetails from "./Pages/RoomDetails";
import EventList from "./Pages/EventList";
import EventDetails from "./Pages/EventDetails";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import UserUi from "./Layout/UserUi";
import Booking from "./Pages/Booking";

import AdminBookings from "./Components/Admin/AdminBookings";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminEventDetails from "./Components/Admin/AdminEventDetails";
import AdminEvents from "./Components/Admin/AdminEvents";
import AdminGallery from "./Components/Admin/AdminGallery";
import AdminHome from "./Components/Admin/AdminHome";
import AdminMenu from "./Components/Admin/AdminMenu";
import AdminProfiles from "./Components/Admin/AdminProfiles";
import AdminRoomDetails from "./Components/Admin/AdminRoomDetails";
import AdminRooms from "./Components/Admin/AdminRooms";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

import { AuthProvider } from "./Auth/AuthContext";

// import ProtectedRoutes from "./Auth/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Users Routes */}
      <Route path="/" element={<UserUi />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="booking" element={<Booking />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:id" element={<RoomDetails />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Routes */}
      <Route path="admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route exact path="admin-profiles" element={<AdminProfiles />} />
        <Route path="admin-events" element={<AdminEvents />} />
        <Route path="admin-events/:eventId" element={<AdminEventDetails />} />
        <Route path="admin-bookings" element={<AdminBookings />} />
        <Route path="admin-gallery" element={<AdminGallery />} />
        <Route path="admin-rooms" element={<AdminRooms />} />
        <Route path="admin-rooms/:roomId" element={<AdminRoomDetails />} />
        <Route path="admin-menu" element={<AdminMenu />} />
        <Route path="admin-signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
