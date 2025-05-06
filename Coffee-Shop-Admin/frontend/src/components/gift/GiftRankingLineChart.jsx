import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loading from '../common/Loading';

import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from 'recharts';

const MONTHS = [
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

const colors = ['#f7093b', '#f5c1fd', '#2cd27e', '#26a1d5', '#9c1ae7', '#0acb10', '#fae534', '#b8f331', '#FFD9B3', '#caD9B3'];

const GiftRankingLineChart = () => {
    const [data, setData] = useState([]);
    const [giftNames, setGiftNames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const promises = MONTHS.map((month) => {
                return axios.get('http://localhost:3300/api/gifts/ranking', {
                    params: {
                        start_date: month.start_date,
                        end_date: month.end_date,
                    },
                });
            });

            const results = await Promise.all(promises);

            const giftNamesSet = new Set();

            const formattedData = results.map((response, index) => {
                const monthName = MONTHS[index].name;
                const topGifts = response.data.slice(0, 7);

                const dataPoint = { month: monthName };

                topGifts.forEach((gift) => {
                    dataPoint[gift.gift_name] = parseInt(gift.total_quantity, 10);
                    giftNamesSet.add(gift.gift_name);
                });

                return dataPoint;
            });

            setData(formattedData);
            setGiftNames(Array.from(giftNamesSet));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!data || data.length === 0) {
        return <div className="text-red-500 font-medium">No data available.</div>;
    }

    return (
        <motion.div
            className="bg-gray-800 backdrop-blur-md bg-opacity-50 shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-center text-xl font-medium text-gray-100 mb-4">Featured Gifts Over Time</h2>
            <div className="h-80">
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip />
                        <Legend />
                        {giftNames.map((giftName, index) => (
                            <Line
                                key={giftName}
                                type="monotone"
                                dataKey={giftName}
                                stroke={colors[index % colors.length]}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default GiftRankingLineChart;