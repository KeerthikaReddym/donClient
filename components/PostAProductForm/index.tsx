"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";

const PostAProductForm = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [condition, setCondition] = useState("");

  useEffect(() => {
    // If category is 'freebies', set price to 0
    if (category === "freebies") {
      setPrice("0");
    }
  }, [category]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleProductPictureChange = (event) => {
    const selectedImages = [...event.target.files];
    const updatedImages = [...images, ...selectedImages];
    setImages(updatedImages);
    const updatedImagesNames = updatedImages.map((image) => image.name);
    setImageNames(updatedImagesNames);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image));
    formData.append("condition", condition);
    formData.append("emailId", user.emailId);
    formData.append("date", new Date().toISOString());

    try {
      const response = await fetch(`http://localhost:8080/donHub/product`, {
        // Replace with your actual API endpoint
        method: "POST",
        body: formData,
      });

      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log(responseData);

      if (response.status === 200) {
        alert("Product posted successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImages([]);
        setImageNames([]);
        setCondition("");
      } else if (response.status === 409) {
        alert(responseData.message || responseData);
      } else {
        alert(responseData.message || responseData);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <label
          htmlFor="name"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Product Name{" "}
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="description"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Description{" "}
        </label>
        <textarea
          name="description"
          placeholder="Enter Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="category"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Category{" "}
        </label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        >
          <option value="">Select Category</option>
          <option value="EDUCATIONAL_MATERIALS">Educational Materials</option>
          <option value="ELECTRONICS_AND_GADGETS">Electronics and Gadgets</option>
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
      <div className="mb-8">
        <label
          htmlFor="images"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          Images
        </label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleProductPictureChange}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
        <div className="mt-4">
          {imageNames.map((name, index) => (
            <div key={index} className="text-sm text-dark dark:text-white">
              {name}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <label
          htmlFor="condition"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Condition{" "}
        </label>
        <select
          name="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        >
          <option value="">Select Condition</option>
          <option value="NEW">New</option>
          <option value="LIKE_NEW">Like New</option>
          <option value="FAIR">Fair</option>
          <option value="GOOD">Good</option>
        </select>
      </div>
      <div className="mb-8">
        <label
          htmlFor="price"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Price{" "}
        </label>
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={price}
          onChange={handlePriceChange}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-6">
        <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
          Post
        </button>
      </div>
    </form>
  );
};

export default PostAProductForm;
