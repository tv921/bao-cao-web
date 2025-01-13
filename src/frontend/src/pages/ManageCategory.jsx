import React, { useEffect, useState } from 'react';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Lỗi khi tải danh mục:', error));
  }, []);

  // Hàm thêm danh mục
  const handleAddCategory = (category) => {
    fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(newCategory => {
        setCategories(prev => [...prev, newCategory]);
      })
      .catch(error => console.error('Lỗi khi thêm danh mục:', error));
  };

  // Hàm cập nhật danh mục
  const handleUpdateCategory = (category) => {
    fetch(`http://localhost:5000/api/categories/${editingCategory._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(updatedCategory => {
        setCategories(prev =>
          prev.map(c => (c._id === editingCategory._id ? updatedCategory : c))
        );
        setEditingCategory(null); // Reset lại editingCategory sau khi cập nhật
      })
      .catch(error => console.error('Lỗi khi cập nhật danh mục:', error));
  };

  // Hàm gọi khi nhấn sửa
  const handleEditCategory = (category) => {
    setEditingCategory(category); // Cập nhật category cần sửa
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý danh mục</h1>

      <CategoryForm
        onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
        category={editingCategory} // Truyền thông tin danh mục cần sửa vào form
      />

      <CategoryList
        categories={categories}
        onEdit={handleEditCategory} // Truyền hàm sửa vào CategoryItem
      />
    </div>
  );
};

export default CategoriesPage;
