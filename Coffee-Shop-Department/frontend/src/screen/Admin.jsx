import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Admin/Nav";
import Footer from "./Footer";

export default function Admin() {
  return (
    <>
      <Nav />
      <main className="bg-gray-400 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
