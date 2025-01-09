import React, { useState } from 'react';
import ManufacturerList from '../components/ManufacturerList';
import ManufacturerForm from '../components/ManufacturerForm';

const ManufacturersPage = () => {
  const [editingManufacturer, setEditingManufacturer] = useState(null);

  const handleAddManufacturer = (manufacturer) => {
    fetch('http://localhost:5000/api/manufacturers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(manufacturer),
    })
      .then(response => response.json())
      .then(() => window.location.reload())
      .catch(error => console.error('Lỗi khi thêm hãng sản xuất:', error));
  };

  const handleUpdateManufacturer = (manufacturer) => {
    fetch(`http://localhost:5000/api/manufacturers/${editingManufacturer._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(manufacturer),
    })
      .then(response => response.json())
      .then(() => window.location.reload())
      .catch(error => console.error('Lỗi khi cập nhật hãng sản xuất:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý hãng sản xuất</h1>
      
      <ManufacturerForm
        onSubmit={editingManufacturer ? handleUpdateManufacturer : handleAddManufacturer}
        manufacturer={editingManufacturer}
      />
      
      <ManufacturerList setEditingManufacturer={setEditingManufacturer} />
    </div>
  );
};

export default ManufacturersPage;
