import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';

import Navbar from '../components/Navbar';
import Slider from '../components/Slider';

function Home() {
   return (
    <>
     <Slider></Slider>
    <h1>Trang chủ</h1>
    <h2>Sản phẩm nổi bật</h2>
    </>
  );
}

export default Home;

