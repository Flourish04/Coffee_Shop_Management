import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Depart/Nav";
import Footer from "./Footer";
import CartTab from "../components/Depart/Cart/cartTab";

export default function Department() {
  return (
    <>
      <div className=" bg-zinc-300 ">
        <Nav />
        {/* <main className="min-h-screen mt-10 mb-3">
          <Outlet />
        </main> */}
        <main className="max-w-full min-h-screen m-auto p-5">
          <Outlet />
        </main>
        <CartTab />
        <Footer />
      </div>
    </>
  );
}
// transform transition-transform duration-500
