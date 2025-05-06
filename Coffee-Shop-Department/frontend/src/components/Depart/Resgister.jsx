import axios from "axios";
import React, { useState } from "react";
import { showFail, showRegister_Suc } from "../Alert/Alert";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const navigate = useNavigate();
  // State variables for form inputs
  const [customerName, setCustomerName] = useState("");
  const [customerUsername, setCustomerUsername] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerBirthdate, setCustomerBirthdate] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      customer_name: customerName,
      customer_username: customerUsername,
      customer_password: customerPassword,
      customer_birthdate: customerBirthdate,
      customer_gender: customerGender,
      customer_phone_number: customerPhoneNumber,
      customer_address: customerAddress,
    };

    try {
      const res = await axios.post(
        "http://localhost:3300/api/register",
        customerData
      );
      console.log(res);

      if (res.status === 200) {
        showRegister_Suc();
        // Reset form fields after successful registration
        setCustomerName("");
        setCustomerUsername("");
        setCustomerPassword("");
        setCustomerBirthdate("");
        setCustomerGender("");
        setCustomerPhoneNumber("");
        setCustomerAddress("");
      } else {
        // showFail();
      }
    } catch (error) {
      // console.log("Error:", error.response.data.mess.error.detail);
      // console.log(error.response);
      console.log(error.response.data.message);

      showFail(error.response.data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-blue-200 p-8 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Customer Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name:
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username:
          </label>
          <input
            type="text"
            value={customerUsername}
            onChange={(e) => setCustomerUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            value={customerPassword}
            onChange={(e) => setCustomerPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Address:
          </label>
          <input
            type="text"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Birthdate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birthdate:
          </label>
          <input
            type="date"
            value={customerBirthdate}
            onChange={(e) => setCustomerBirthdate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender:
          </label>
          <select
            value={customerGender}
            onChange={(e) => setCustomerGender(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number:
          </label>
          <input
            type="text"
            value={customerPhoneNumber}
            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
