import React from "react";
import { Route, Routes } from "react-router-dom";
import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import UsersPage from "../pages/UsersPage";
import Sidebar from "../components/Sidebar";
import SalesPage from "../pages/SalesPage";
import OrderPage from "../pages/OrderPage";
import GiftPage from "../pages/GiftPage";
import EmployeePage from "../pages/EmployeePage";

export default function Admin() {
  return (
      <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
        {/* Background */}
        <div className="fixed inset-0 z-0 flex">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/gifts" element={<GiftPage />} />
          <Route path="/employees" element={<EmployeePage />} />
        </Routes>
      </div>
  )
}
