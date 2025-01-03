import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Lỗi khi tải danh mục:', error));
  }, []);

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
