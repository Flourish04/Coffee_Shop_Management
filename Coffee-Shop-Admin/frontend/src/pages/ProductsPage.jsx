import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import ProductTable from "../components/products/ProductTable";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Search, Trash, Edit, X } from 'lucide-react';
import ProductModal from "../components/products/ProductModals";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const itemsPerPage = 10;
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        product_category: '',
        product_type: '',
        product_description: '',
        product_rating: 4.00,
        product_unit_price: 0,
        product_image: '',
        product_discount: 0,
    });
    const [displayAddProduct, setDisplayAddProduct] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [loadingTopSelling, setLoadingTopSelling] = useState(true);

    const fetchTopSellingProducts = async (category = '') => {
        try {
            setLoadingTopSelling(true);
            const limit = 5;
    
            if (category.trim()) {
                const response = await axios.get("http://localhost:3300/api/products/top-selling", {
                    params: {
                        category: category,
                        limit: limit,
                    },
                });
    
                setTopSellingProducts([
                    {
                        category: category,
                        products: response.data.topSellingProducts,
                    },
                ]);
            } else {
                const response = await axios.get("http://localhost:3300/api/products/top-selling", {
                    params: { limit: 5 },
                });
    
                setTopSellingProducts([
                    {
                        category: "Top Products",
                        products: response.data.topSellingProducts,
                    },
                ]);
            }
            setLoadingTopSelling(false);
        } catch (error) {
            console.error("Error fetching top-selling products:", error);
            setLoadingTopSelling(false);
        }
    };

    useEffect(() => {
        fetchTopSellingProducts();
    }, []);

    const handleData = async () => {
        await axios.get("http://localhost:3300/api/products")
        .then((response) => {
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        handleData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3300/api/products/filter`, {
                params: {
                    product_name: searchTerm.toLowerCase(),
                    min_price: minPrice || 0,
                    max_price: maxPrice || Number.MAX_VALUE,
                    product_category: productCategory.toLowerCase(),
                },
            });
            setFilteredProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
            setLoading(false);
        }
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(newProduct);

            const response = await axios.post("http://localhost:3300/api/products", {
                product_name: newProduct.product_name,
                product_category: newProduct.product_category,
                product_type: newProduct.product_type,
                product_description: newProduct.product_description,
                product_rating: parseFloat(newProduct.product_rating),
                product_unit_price: parseFloat(newProduct.product_unit_price),
                product_image: newProduct.product_image,
                product_discount: parseFloat(newProduct.product_discount),
            });
            console.log("Product added successfully:", response.data);
            setNewProduct({
                product_name: '',
                product_category: '',
                product_type: '',
                product_description: '',
                product_rating: 4.00,
                product_unit_price: 0,
                product_image: '',
                product_discount: 0,
            });
            alert("Product added successfully!");
            handleData();
            setDisplayAddProduct(false);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    const deleteProduct = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:3300/api/products/${productId}`);
            setProducts(products.filter((product) => product.product_id !== productId));
            setFilteredProducts(filteredProducts.filter((product) => product.product_id !== productId));
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title="Products" />

            <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 animate-fade-in">
                    <StatCard name="Total Products" icon={Package} value="91" color="#6366f1" />
                    <StatCard name="Top Selling" icon={TrendingUp} value="58" color="#8b56f6" />
                    <StatCard name="Low Stock" icon={AlertTriangle} value="33" color="#f59e0b" />
                    <StatCard name="Total Revenue" icon={DollarSign} value="253.68M" color="#ef4444" />
                </div>

                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
                    <h2 className="text-xl font-semibold text-gray-100 mb-4">Top Selling Products</h2>
                    
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Filter by category"
                            className="bg-gray-700 text-gray-100 p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        />
                        <button
                            onClick={() => fetchTopSellingProducts(filterCategory)}
                            className="bg-blue-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
                        >
                            Filter
                        </button>
                    </div>
                    
                    {loadingTopSelling ? (
                        <Loading />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {topSellingProducts.map((category) => (
                                <div key={category.category} className="bg-gray-700 p-4 rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold text-gray-100 mb-2">{category.category}</h3>
                                    <ul>
                                        {category.products.map((product) => (
                                            <li
                                                key={product.product_id}
                                                className="text-gray-300 flex justify-between py-1 border-b border-gray-600"
                                            >
                                                <span>{product.product_name}</span>
                                                <span>{product.total_sold} sold</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 transition-all duration-300'>
                    <div className='flex justify-between items-center mb-6'>
                        <div className='relative flex items-center gap-2'>
                            <input
                                type='text'
                                placeholder='Search products...'
                                className='bg-gray-700 text-gray-100 p-2 pl-8 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                            <input
                                type='number'
                                placeholder='Min Price'
                                className='bg-gray-700 text-gray-100 p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500'
                                onChange={(e) => setMinPrice(e.target.value)}
                                value={minPrice}
                            />
                            <input
                                type='number'
                                placeholder='Max Price'
                                className='bg-gray-700 text-gray-100 p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500'
                                onChange={(e) => setMaxPrice(e.target.value)}
                                value={maxPrice}
                            />
                            <input
                                type='text'
                                placeholder='Category'
                                className='bg-gray-700 text-gray-100 p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500'
                                onChange={(e) => setProductCategory(e.target.value)}
                                value={productCategory}
                            />
                            <button
                                onClick={handleSearch}
                                className='bg-blue-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300'
                            >
                                Search
                            </button>
                            <Search className='absolute top-2 left-2 text-gray-500' />
                        </div>
                        <button
                            onClick={() => setDisplayAddProduct(true)}
                            className='border border-white p-3 rounded-xl hover:bg-gray-700 transition duration-300'
                        >
                            Add product
                        </button>
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
                                                <button
                                                    className='text-red-400 hover:text-red-300'
                                                    onClick={() => deleteProduct(item.product_id)}
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        className='mt-4'
                    />
                </div>
            </div>
            {selectedProduct && (
                <ProductModal productID={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
            {displayAddProduct && (
                <div className='absolute z-50 top-[10%] left-1/4 h-fit w-1/2 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-100">Add Product</h2>
                        <button onClick={() => setDisplayAddProduct(false)}>
                            <X size={24} className="text-gray-300 hover:text-white transition duration-300" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={newProduct.product_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter product name"
                                    className="w-full p-2 rounded bg-gray-700 text-gray-100"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    name="product_category"
                                    value={newProduct.product_category}
                                    onChange={handleInputChange}
                                    placeholder="Enter product category"
                                    className="w-full p-2 rounded bg-gray-700 text-gray-100"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Unit Price</label>
                                <input
                                    type="number"
                                    name="product_unit_price"
                                    value={newProduct.product_unit_price}
                                    onChange={handleInputChange}
                                    placeholder="Enter price"
                                    className="w-full p-2 rounded bg-gray-700 text-gray-100"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Discount</label>
                                <input
                                    type="number"
                                    name="product_discount"
                                    value={newProduct.product_discount}
                                    onChange={handleInputChange}
                                    placeholder="Enter discount (%)"
                                    className="w-full p-2 rounded bg-gray-700 text-gray-100"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-gray-600 text-gray-100 hover:bg-gray-500"
                                onClick={() => setDisplayAddProduct(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-600 text-gray-100 hover:bg-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;