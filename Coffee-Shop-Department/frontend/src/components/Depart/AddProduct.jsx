import React, { useState } from "react";
import axios from "axios";
import { showADD_Suc, showFail } from "../Alert/Alert";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productCategory: "",
    productType: "",
    productName: "",
    productDescription: "",
    productRating: "",
    productUnitPrice: "",
    productDiscount: 0,
    productState: "available",
    productImage: null,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change (for image upload)
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      productImage: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append form data
    Object.keys(formData).forEach((key) => {
      if (key === "productImage" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3300/api/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        showADD_Suc();
      } else {
        showFail();
      }
    } catch (error) {
      console.log(error);
      showFail();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-200 shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          ADDING PRODUCT TO BUY
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Product Category */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Category:
            </label>
            <input
              type="text"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Type */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Type:
            </label>
            <input
              type="text"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Description */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Description:
            </label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              rows="4" // Controls the height (number of visible rows)
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Product Rating */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Rating:
            </label>
            <input
              type="number"
              name="productRating"
              value={formData.productRating}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="10"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Unit Price */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Unit Price:
            </label>
            <input
              type="number"
              name="productUnitPrice"
              value={formData.productUnitPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Discount */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Discount:
            </label>
            <input
              type="number"
              name="productDiscount"
              value={formData.productDiscount}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product State */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product State:
            </label>
            <select
              name="productState"
              value={formData.productState}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          {/* Product Image */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Product Image:
            </label>
            <input
              type="file"
              name="productImage"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Upload Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
