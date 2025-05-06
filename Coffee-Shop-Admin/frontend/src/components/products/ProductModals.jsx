import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../common/Loading';

const ProductModal = ({ productID, onClose }) => {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3300/api/products/${productID}`);
      setProductDetails(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3300/api/products/${productID}`, productDetails);
      alert('Product updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update product details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='absolute z-50 top-[10%] left-1/4 h-[80%] w-[50%] flex justify-center p-6 rounded shadow-lg bg-gray-100 text-gray-800'>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-100 hover:text-gray-400 text-2xl">&times;</button>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
              Product Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-name"
              type="text"
              value={productDetails.product_name || ''}
              onChange={(e) => setProductDetails({ ...productDetails, product_name: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category">
              Category
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-category"
              type="text"
              value={productDetails.product_category || ''}
              onChange={(e) => setProductDetails({ ...productDetails, product_category: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-price">
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-price"
              type="number"
              value={productDetails.product_unit_price || ''}
              onChange={(e) => setProductDetails({ ...productDetails, product_unit_price: e.target.value })}
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductModal;