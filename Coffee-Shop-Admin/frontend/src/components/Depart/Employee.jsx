import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [sortBy, setSortBy] = useState("employee_salary"); // Default sort by salary
  const [order, setOrder] = useState("asc"); // Default order is ascending

  // Fetch employees based on filters and sorting
  const fetchEmployees = () => {
    const params = {
      department_id: departmentId,
      name: name,
      position: position,
      sort_by: sortBy,
      order: order,
    };

    axios
      .get("http://localhost:3300/api/employees", { params })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  // Trigger fetching employees whenever filters or sorting change
  useEffect(() => {
    setDepartmentId(localStorage.getItem("id"));
    fetchEmployees();
  }, [departmentId, name, position, sortBy, order]);

  // Handle sorting toggle
  const handleSort = (field) => {
    if (sortBy === field) {
      // If already sorted by the same field, toggle the order
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      // Set sorting by the new field with ascending order
      setSortBy(field);
      setOrder("asc");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-extrabold mb-6  ">Employee List</h1>
      </div>

      {/* Search Filters */}
      <div className="mb-6 p-4 bg-blue-400 rounded-lg shadow-lg">
        <div className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Department ID:
            </label>
            <input
              type="text"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              placeholder="Department ID"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span className="px-1">Employee Name:</span>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Employee Name"
              className="bg-slate-400 text-2xl mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span className="p-1">Position:</span>
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position"
              className="bg-slate-400 text-2xl  mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* <button
            onClick={fetchEmployees}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
          </button> */}
        </div>
      </div>

      {/* Employees Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg mt-8">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-200">
            <tr>
              {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Department ID
              </th> */}
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                Position
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">
                Phone Number
              </th>
              <th
                onClick={() => handleSort("employee_salary")}
                className="px-6 py-3 text-left text-sm font-bold text-gray-500 cursor-pointer"
              >
                Salary{" "}
                {sortBy === "employee_salary" && (order === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr
                  key={employee.employee_id}
                  className="border-b hover:bg-gray-50"
                >
                  {/* <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {employee.employee_id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {employee.employee_department_id}
                  </td> */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.employee_first_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.employee_last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.employee_position}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.employee_start_date.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.employee_phone_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.employee_salary} USD/Day
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
