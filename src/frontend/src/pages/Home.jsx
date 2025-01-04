import React from 'react';
import Slider from '../components/Slider';
import ProductList from '../components/ProductList';

function Home() {
  return (
    <>
      <Slider />
      <ProductList categoryId="6777ce2adece28b43c0a3341" title="Học tập văn phòng" />
      <ProductList categoryId="6777ce79dece28b43c0a3343" title="Laptop gaming" />
      <ProductList categoryId="677944c470994dccbe87cce5" title="Laptop mỏng nhẹ cao cấp" />
    </>
  );
}

export default Home;

