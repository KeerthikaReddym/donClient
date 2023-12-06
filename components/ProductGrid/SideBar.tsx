"use client";

import { useState, useContext } from "react";
import { ProductsContext } from "@/contexts/ProductContext";
import { AuthContext } from "@/contexts/AuthContext";

const Sidebar = () => {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [myProducts, setMyProducts] = useState(false);

  const { updateProducts } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);
  const applyFilters = async () => {
    let url;
    let response, data;

    // Check if both category and condition are provided
    if (category && condition) {
      url = `http://localhost:8080/donHub/product/getProductsByFilters/${category}/${condition}`;
    } else if (category) {
      // Only category is provided
      url = `http://localhost:8080/donHub/product/getByCategory/${category}`;
    } else if (condition) {
      // Only condition is provided
      url = `http://localhost:8080/donHub/product/getByCondition/${condition}`;
    } else if (myProducts && user && user.emailId) {
      url = `http://localhost:8080/donHub/product/getByEmail/${encodeURIComponent(user.emailId)}`
    } else {
      // No filters are provided, fetch all products
      url = `http://localhost:8080/donHub/product`;
    }

    try {
      response = await fetch(url);
      data = await response.json();
      console.log("Filtered Products:", data);
      updateProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    // Reset filters
    setCategory("");
    setCondition("");
    
    // Reset any other states if needed
  };

  return (
    <div className="w-[250px] bg-primary p-4">
      <p className="mb-4 font-bold text-white">Filter By</p>
      <div className="mb-4">
        <label className="mb-2 block text-white">Category</label>
        <select
          className="w-full rounded border bg-white p-2 text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="EDUCATIONAL_MATERIALS">Educational Materials</option>
          <option value="ELECTRONICS_AND_GADGETS">
            Electronics and Gadgets
          </option>
          <option value="FURNITURE_AND_HOME_ESSENTIALS">
            Furniture and Home Essentials
          </option>
          <option value="CLOTHINGS_AND_ACCESSORIES">
            Clothings and Accessories
          </option>
          <option value="TRANSPORTATION">Transportation</option>
          <option value="MUSICAL_INSTRUMENTS">Musical Instruments</option>
          <option value="FREEBIES">Freebies</option>
          <option value="HEALTH">Health</option>
          <option value="ENTERTAINMENT">Entertainment</option>
          <option value="DIYS">DIYs</option>
          <option value="MISCELLANEOUS">Miscellaneous</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-white">Condition</label>
        <select
          className="w-full rounded border bg-white p-2 text-black"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Select Condition</option>
          <option value="NEW">New</option>
          <option value="LIKE_NEW">Like New</option>
          <option value="FAIR">Fair</option>
          <option value="GOOD">Good</option>
        </select>
      </div>

      {/* <div className="mb-4">
        <label className="text-white block mb-2">Price</label>
        <input
          type="number"
          placeholder="Max Price"
          className="p-2 w-full border rounded text-black bg-white"
        />
      </div> */}

      {/* Add additional filters as needed */}
      <div className="mb-4">
        <input
          type="checkbox"
          checked={myProducts}
          onChange={(e) => setMyProducts(e.target.checked)}
          className="mr-2"
        />
        <label className="text-white">My Products</label>
      </div>
      <button
        className="w-full rounded bg-white p-2 text-primary"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Sidebar;
