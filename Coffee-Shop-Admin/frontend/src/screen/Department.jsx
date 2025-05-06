import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Depart/Nav";
import Footer from "./Footer";
export default function Department() {
  return (
    <>
      <div className=" bg-zinc-300 ">
        <Nav />
        <main className="min-h-screen mt-10 mb-3">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
