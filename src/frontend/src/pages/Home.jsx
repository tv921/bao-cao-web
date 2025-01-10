import React from 'react';
import Slider from '../components/Slider';
import ProductList from '../components/ProductListByCategory';
import Footer from '../components/Footer'
function Home() {
  return (
    <>
     <div className="container mx-auto px-4">
      <Slider />
      <ProductList categoryId="675bc20d6df648478e4756cf" title="Laptop văn phòng" />
      <ProductList categoryId="675cfe95fb5fc99bc8fafce7" title="Laptop gaming" />
      <ProductList categoryId="675d0fe241cb03f8fcd34b77" title="Laptop mỏng nhẹ cao cấp" />
    </div>
    <Footer></Footer>
    </>
   
  );
}

export default Home;

