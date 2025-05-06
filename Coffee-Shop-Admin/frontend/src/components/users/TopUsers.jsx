import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loading from '../common/Loading';
import { Medal } from 'lucide-react';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3300/api/customers/top-spenders')
      .then((response) => {
        setTopUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Top 10 Customers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Total Spending</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Spending Class</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {topUsers.map((user) => (
              <tr key={user.customer_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                  {user.customer_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                  ${user.total_spending}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                  {user.spending_class}<Medal color='#FFAA1D' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TopUsers;