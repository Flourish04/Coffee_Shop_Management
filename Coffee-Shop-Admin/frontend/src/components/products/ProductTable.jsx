import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Search, Trash, Edit, X } from 'lucide-react';
import Pagination from '../common/Pagination';
import Loading from '../common/Loading';
import ProductModal from './ProductModals';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [displayAddProduct, setDisplayAddProduct] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get("http://localhost:3300/api/products")
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter((product) => {
            const productName = product.product_name || '';
            const productCategory = product.product_category || '';
            return (
                productName.toLowerCase().includes(term) ||
                productCategory.toLowerCase().includes(term)
            );
        });
        setFilteredProducts(filtered);
    };

    const handleImage = (image) => {
        const byteArray = new Uint8Array(image.data);
        let binary = '';
        for (let i = 0; i < byteArray.length; i++) {
            binary += String.fromCharCode(byteArray[i]);
        }
        const base64String = window.btoa(binary);
        return `data:image/jpeg;base64,${base64String}`;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 transition-all duration-300'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
                <button
                    onClick={() => setDisplayAddProduct(true)}
                    className='border border-white p-3 rounded-xl hover:bg-gray-700 transition duration-300'
                >
                    Add product
                </button>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search products...'
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
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Category</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Price</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Sales</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-700'>
                            {currentItems.map((item) => (
                                <tr key={item.product_id} className='hover:bg-gray-700 transition duration-300'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100 flex gap-2 items-center'>
                                        <img
                                            src={handleImage(item.product_image)}
                                            alt={item.product_name}
                                            className='w-10 h-10 rounded-full'
                                        />
                                        {item.product_name}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-200'>{item.product_category}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-200'>
                                        {item.product_unit_price}$
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-200'>
                                        {item.product_discount}%
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                        <button
                                            className='text-indigo-400 hover:text-indigo-300 mr-2'
                                            onClick={() => setSelectedProduct(item.product_id)}
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button className='text-red-400 hover:text-red-300'>
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className='mt-4'
            />
            {selectedProduct && (
                <ProductModal productID={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
            {displayAddProduct && (
                <div className='absolute z-50 top-0 left-1/4 h-1/2 w-1/2 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
                    <button onClick={() => setDisplayAddProduct(false)}>
                        <X size={24} className='text-gray-300 hover:text-white transition duration-300' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductTable;