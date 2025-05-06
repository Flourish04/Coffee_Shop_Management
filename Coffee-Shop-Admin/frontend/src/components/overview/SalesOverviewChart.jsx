import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading';

const SalesOverviewChart = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const months = [
        { start_date: "2023-01-01", end_date: "2023-01-31", name: "Jan" },
        { start_date: "2023-02-01", end_date: "2023-02-28", name: "Feb" },
        { start_date: "2023-03-01", end_date: "2023-03-31", name: "Mar" },
        { start_date: "2023-04-01", end_date: "2023-04-30", name: "Apr" },
        { start_date: "2023-05-01", end_date: "2023-05-31", name: "May" },
        { start_date: "2023-06-01", end_date: "2023-06-30", name: "Jun" },
        { start_date: "2023-07-01", end_date: "2023-07-31", name: "Jul" },
        { start_date: "2023-08-01", end_date: "2023-08-31", name: "Aug" },
        { start_date: "2023-09-01", end_date: "2023-09-30", name: "Sep" },
        { start_date: "2023-10-01", end_date: "2023-10-31", name: "Oct" },
        { start_date: "2023-11-01", end_date: "2023-11-30", name: "Nov" },
        { start_date: "2023-12-01", end_date: "2023-12-31", name: "Dec" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const promises = months.map((month) =>
                    axios.get(`http://localhost:3300/api/revenue`, {
                        params: {
                            start_date: month.start_date,
                            end_date: month.end_date,
                        },
                    })
                );
                const results = await Promise.all(promises);

                const formattedData = results.map((response, index) => {
                    const totalRevenue = response.data.reduce((sum, item) => sum + parseFloat(item.total_revenue), 0);
            
                    return {
                        name: months[index].name,
                        sales: totalRevenue,
                    };
                });

                setSalesData(formattedData);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch sales data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-gray-100 font-medium text-lg mb-4">Sales Overview (2023)</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                        <XAxis dataKey="name" />
                        <YAxis stroke="#9cabaf" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4b5563",
                            }}
                            itemStyle={{ color: "#e5e7eb" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
                            activeDot={{ strokeWidth: 2, r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SalesOverviewChart;
