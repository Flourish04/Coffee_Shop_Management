import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loading from "../common/Loading";

const COLORS = ["#6366F1", "#8b56f6", "#9c1ae7"];

const SalesByDepartment = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesByDepartment = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3300/api/revenue?start_date=2023-01-01&end_date=2023-12-31"
                );

                // Transform data to match the expected structure
                const formattedData = response.data.map((item) => ({
                    order_department_id: item.order_department_id,
                    sales: parseFloat(item.total_revenue),
                }));

                setData(formattedData);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };

        fetchSalesByDepartment();
    }, []);

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500">Failed to load data. Please try again later.</p>;

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl lg:col-span-2 p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className="text-lg font-medium mb-4 text-gray-100">Sales by Department</h2>

            <div className="h-80">
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                        <XAxis dataKey="order_department_id" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#6366F1">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SalesByDepartment;
