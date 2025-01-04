import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    <div>
      <h1 className="text-xl font-bold mb-4">Kết quả tìm kiếm cho: "{searchQuery}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.length > 0 ? (
          results.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={product.hinh_anh} // Giả sử bạn có trường image trong dữ liệu sản phẩm
                alt={product.ten_san_pham} // Giả sử bạn có trường name trong dữ liệu sản phẩm
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{product.ten_san_pham}</h2> {/* Giả sử bạn có trường name */}
              <p className="text-sm text-gray-600">{product.mo_ta}</p> {/* Giả sử bạn có trường description */}
              <p className="text-xl font-bold mt-2">{product.gia} VND</p> {/* Giả sử bạn có trường price */}
            </div>
          ))
        ) : (
          <p className="text-lg">Không tìm thấy sản phẩm nào!</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
