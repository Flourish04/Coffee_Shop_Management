import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../common/Loading';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';
import Pagination from '../common/Pagination';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3300/api/orders', {
        params: { page, limit: 10 }, // Adjust limit as needed
      });
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setTotalOrders(response.data.totalOrders);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Total Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{order.order_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {order.order_customer_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {new Date(order.order_transaction_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {order.order_transaction_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {order.order_total_quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  ${parseFloat(order.order_total_price).toFixed(2)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button 
                    className='text-indigo-400 hover:text-indigo-300 mr-2'
                    onClick={() => setSelectedOrder(order.order_id)}
                  >
										<Eye size={18} />
									</button>
								</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className='mt-4' />
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </motion.div>
  );
};

export default OrderTable;