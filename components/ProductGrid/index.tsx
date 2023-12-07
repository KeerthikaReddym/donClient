"use client";
import React, { useEffect, useContext } from "react";
import SingleProduct from "./SingleProduct";
import { ProductsContext } from "@/contexts/ProductContext";

const ProductGrid = () => {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://donhub.onrender.com/donHub/product`);
        const data = await response.json();
        console.log("fetched products", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        console.log(error.response);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleProductDelete = (deletedProductId) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.customId !== deletedProductId,
      ),
    );
  };

  const hasProducts = products && products.length > 0;
  return (
    <section
      id="product"
      className=" py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        {hasProducts ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
            {products.map((product) => (
              <div key={product.customId} className="w-full">
                <SingleProduct
                  product={product}
                  onDelete={handleProductDelete}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center text-lg font-semibold text-gray-600 dark:text-gray-300">
              No products to display
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
