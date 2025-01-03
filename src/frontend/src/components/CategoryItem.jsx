import React from 'react';

const CategoryItem = ({ category }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa danh mục này?');
    if (confirmed) {
      await fetch(`http://localhost:5000/api/categories/${category._id}`, {
        method: 'DELETE',
      });
      window.location.reload();
    }
  };

  return (
    <div className="p-4 border rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{category.ten_danh_muc}</h3>
        <p>{category.mo_ta}</p>
      </div>
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => alert('Chức năng sửa chưa được triển khai')}
        >
          Sửa
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDelete}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
