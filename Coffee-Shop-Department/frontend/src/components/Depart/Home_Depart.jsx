import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card_Product from "./Card_Product";
import { useSelector } from "react-redux";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusTabCart = useSelector((store) => store.cart.statusTab);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:3300/api/products")
      .then((response) => {
        setProducts(response.data); // Set the data in state
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false); // Stop loading in case of error
      });
  }, []); // Empty array means this effect runs once when the component mounts

  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/3 ">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div
        className={` p-5 transform transition-transform duration-500
       ${statusTabCart === false ? "" : "-translate-x-60"}`}
      >
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 ">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            products.map((product) => (
              <Card_Product key={product.id} data={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
