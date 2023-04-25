import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import GalleryPage from "./Pages/GalleryPage";
import Rooms from "./Pages/Rooms";
import EventList from "./Pages/EventList";
import EventDetails from "./Pages/EventDetails";
import Contact from "./Pages/Contact";
import Menu from "./Pages/Menu";
import NotFound from "./Pages/NotFound";

function Layout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Rooms />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Layout;
