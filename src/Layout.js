import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import GalleryPage from "./Pages/GalleryPage";
import Rooms from "./Pages/Rooms";

function Layout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Layout;
