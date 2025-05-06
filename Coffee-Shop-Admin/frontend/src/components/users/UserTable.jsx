import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash, Edit } from 'lucide-react';
import Pagination from '../common/Pagination';
import Loading from '../common/Loading';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3300/api/customers', {
        params: { page, limit: itemsPerPage, search: searchTerm },
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setTotalUsers(response.data.totalUsers);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`http://localhost:3300/api/customers/${id}`);
        setUsers(users.filter(user => user.customer_id !== id)); // Cập nhật danh sách người dùng sau khi xóa
        alert('Customer deleted successfully');
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Failed to delete customer');
      }
    }
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Customer List</h2>
        <div className='relative '>
          <input
            type='text'
            placeholder='Search users...'
            className='bg-gray-700 text-gray-100 p-2 pl-8 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500'
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className='absolute top-2 left-2 text-gray-500' />
        </div>
      </div>
      <div className='overflow-x-auto'>
        {loading ? (
          <Loading />
        ) : (
          <table className='min-w-full divide-y divide-gray-700'>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Birthday</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Gender</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Point</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {users.map((item) => (
                <tr key={item.customer_id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100 flex gap-2 items-center'>
                    {item.customer_name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-200'>{new Date(item.customer_birthdate).toLocaleDateString()}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-200'>{item.customer_gender === 'M' ? 'Male' : 'Female'}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-200'>{item.customer_point}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
                      <Edit size={18} />
                    </button>
                    <button
                      className='text-red-400 hover:text-red-300'
                      onClick={() => handleDelete(item.customer_id)}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className='mt-4' />
    </motion.div>
  );
};

export default UserTable;