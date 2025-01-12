import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query'); // Lấy từ khóa tìm kiếm từ URL
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/search?searchTerm=${searchQuery}`);
        setResults(data);
      } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      }
    };
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
<div className="my-8">
  <h1 className="text-4xl font-bold mb-6 text-gray-800">Kết quả tìm kiếm cho: "{searchQuery}"</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
    {results.length > 0 ? (
      results.map((product) => (
        <Link
          to={`/productdetail/${product._id}`}
          key={product._id}
          className="group border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white overflow-hidden flex flex-col"
          style={{ height: '400px', width: '340px' }}
        >
          {/* Hình ảnh sản phẩm */}
          <div className="w-full h-56 flex items-center justify-center bg-gray-100">
            <img
              src={product.hinh_anh}
              alt={product.ten_san_pham}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* Thông tin sản phẩm */}
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              {product.ten_san_pham}
            </h2>
            <div className="mt-auto">
              <p className="text-2xl text-red-500 font-bold">
                {product.gia.toLocaleString()} VNĐ
              </p> {/* Màu đỏ cho giá */}
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p className="text-lg text-gray-600">Không tìm thấy sản phẩm nào!</p>
    )}
  </div>
</div>


  );
};

export default SearchResults;

