import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, onEdit }) => {
  return (
    <div className="space-y-4">
      {categories.map(category => (
        <CategoryItem
          key={category._id}
          category={category}
          onEdit={onEdit} // Truyền hàm onEdit vào CategoryItem
        />
      ))}
    </div>
  );
};

export default CategoryList;