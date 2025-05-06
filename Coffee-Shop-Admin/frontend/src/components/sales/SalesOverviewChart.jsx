import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import axios from 'axios';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loading from "../common/Loading";
import { Bird } from "lucide-react";

const SalesOverviewChart = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const promises = [];
          let currentDate = new Date(startDate);
      
          while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const start = `${year}-${String(month).padStart(2, '0')}-01`;
            const end = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;
      
            promises.push(
              axios.get('http://localhost:3300/api/revenue', {
                params: { start_date: start, end_date: end },
              })
            );
      
            currentDate.setMonth(currentDate.getMonth() + 1);
          }
      
          const results = await Promise.all(promises);
      
          const formattedData = results.map((response, index) => {
            const totalRevenue = response.data.reduce(
              (sum, item) => sum + parseFloat(item.total_revenue),
              0
            );
            const date = new Date(startDate);
            date.setMonth(date.getMonth() + index);
            return {
              date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
              sales: totalRevenue,
            };
          });
      
          setSalesData(formattedData);
        } catch (error) {
          console.error(error);
          setError('Failed to fetch sales data');
        } finally {
          setLoading(false);
        }
      };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex items-center justify-center mb-6">
                <h2 className="text-lg font-semibold text-gray-200">Sales Overview</h2>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-6">
                <div>
                    <label className="text-gray-200">Start Date:</label>
                    <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        maxDate={endDate || new Date()}
                        className="bg-gray-700 text-gray-200 ml-2 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="text-gray-200">End Date:</label>
                    <ReactDatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={startDate}
                        maxDate={new Date()}
                        className="bg-gray-700 text-gray-200 ml-2 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            {loading && <Loading />}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && salesData.length > 0 && (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                            <XAxis dataKey="date" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                                    borderColor: "#4b5563",
                                }}
                                itemStyle={{ color: "#e5e7eb" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#6366f1"
                                fill="#6366f1"
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
};

export default SalesOverviewChart;