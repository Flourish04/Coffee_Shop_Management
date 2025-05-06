import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../common/Loading";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ['#f7093b', '#f5c1fd', '#2cd27e', '#26a1d5', '#9c1ae7', '#0acb10', '#fae534', '#b8f331', '#FFD9B3', '#caD9B3'];

const CategoryDistributionChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3300/api/products/")
      .then((response) => {
        const products = response.data;
        const categoryCounts = products.reduce((acc, product) => {
          const category = product.product_category || 'Unknown';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.entries(categoryCounts).map(([name, value]) => ({
          name,
          value,
        }));

        setChartData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Category Distribution</h2>
      <div className="h-80 ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              label
              outerRadius={80}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;