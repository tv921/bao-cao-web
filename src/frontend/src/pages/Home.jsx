import React from 'react';
import Slider from '../components/Slider';
import ProductList from '../components/ProductListByCategory';

function Home() {
  return (
    <div className="container mx-auto px-4">
      <Slider />
      <ProductList categoryId="6777ce2adece28b43c0a3341" title="Học tập văn phòng" />
      <ProductList categoryId="675cfe95fb5fc99bc8fafce7" title="Laptop gaming" />
      <ProductList categoryId="675bc20d6df648478e4756cf" title="Laptop mỏng nhẹ cao cấp" />
    </div>
  );
}

export default Home;

