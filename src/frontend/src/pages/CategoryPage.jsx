import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = (category) => {
    fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(() => window.location.reload())
      .catch(error => console.error('Lỗi khi thêm danh mục:', error));
  };

  const handleUpdateCategory = (category) => {
    fetch(`http://localhost:5000/api/categories/${editingCategory._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(() => window.location.reload())
      .catch(error => console.error('Lỗi khi cập nhật danh mục:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý danh mục</h1>
      
      <CategoryForm
        onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
        category={editingCategory}
      />
      
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;
