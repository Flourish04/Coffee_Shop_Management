import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../common/Loading';

const OrderDetailsModal = ({ orderId, onClose }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/api/orders/${orderId}`);
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-3/4 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Order Details - #{orderId}</h2>
          <button onClick={onClose} className="text-gray-100 hover:text-gray-400 text-2xl">&times;</button>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <p className="text-gray-100 mb-4">
              <strong>Department:</strong> {orderDetails[0].department_name}
            </p>
            <p className='text-gray-100 mb-4'>
              <strong>Table ID:</strong> {orderDetails[0].table_id}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {orderDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-200">{item.product_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-200">{item.order_item_quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-200">{item.product_discount}</td>
                      <td className="px-6 py-4 text-sm text-gray-200">
                        ${parseFloat(item.order_item_price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-gray-100">
              <p>
                <strong>Total Price:</strong> ${parseFloat(orderDetails[0].order_total_price).toFixed(2)}
              </p>
              <p>
                <strong>Transaction Date:</strong>{' '}
                {new Date(orderDetails[0].order_transaction_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Transaction Time:</strong> {orderDetails[0].order_transaction_time}
              </p>
              <p>
                <strong>Employee ID:</strong> {orderDetails[0].order_employee_id}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsModal;