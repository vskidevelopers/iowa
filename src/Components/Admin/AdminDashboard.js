import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex w-3/5 flex-col flex-1">
        <main className="flex-1 overflow-y-auto before:absolute before:content-[''] before:bg-emerald-100  before:h-72 before:w-full before:-z-10 before:left-1/2 before:top-0 before:transform before:translate-x-[-50%] ">
          <div className="mt-10 px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
