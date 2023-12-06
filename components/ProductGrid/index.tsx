"use client";
import React, { useState, useEffect, useContext } from 'react';
import SingleProduct from "./SingleProduct";
import { ProductsContext } from '@/contexts/ProductContext';

const ProductGrid = () => {

  //const [products, setProducts] = useState([]);
  const {products, updateProducts} = useContext(ProductsContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/donHub/product`); 
        const data = await response.json();
        console.log("fetched products",data);
        updateProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        console.log(error.response);
      }
    };

    fetchProducts();
  }, [updateProducts]);


  return (
    <section
      id="product"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="w-full">
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
