import React from 'react';
import '../css/index.css';

const SearchBar = ({ query, setQuery, searchRecipes }) => {
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn việc gửi form mặc định
        searchRecipes(); // Gọi hàm tìm kiếm
    };

    return(    
<form className="max-w-2xl mx-auto bg-gray-100 p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
  <label htmlFor="default-search" className="mb-2 text-sm font-bold text-gray-700 sr-only">Tìm kiếm</label>
  <div className="relative max-h-48">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="#" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
    </div>
    <input 
      type="search" 
      id="default-search" 
      className="block w-full h-16 p-4 text-base ps-10 text-gray-700 border border-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
      placeholder="Nhập tên món ăn hay nguyên liệu" 
      value={query}
      onChange={(e) => setQuery(e.target.value)} 
      required 
    />
    <button 
      type="submit" 
      className="absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg px-4 py-2"
    >
      Tìm kiếm
    </button>
  </div>
</form>

    );
}

export default SearchBar;
