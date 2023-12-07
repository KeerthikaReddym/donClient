import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { ProductsContext } from "@/contexts/ProductContext";
import { MdDelete } from "react-icons/md";
import { FiPocket } from "react-icons/fi";

const SingleProduct = ({ product, onDelete} ) => {
  const { user } = useContext(AuthContext);
  const { name, description, image, category, condition, date, price, user: productUser } = product;
  
  const handleDelete = async () => {
    const productId = product.customId;
    console.log("Deleting product id:", productId);
    try {
      const response = await fetch(`https://donhub.onrender.com/donHub/product/deleteById/${productId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }
      onDelete(productId);
    } catch (error) {
      console.error("Error deleting product: ", productId, error);
      alert("Error deleting product");
    }
  };
  

  // const handleUpdate = async(updatedData) => {
  //   try {
  //     const response = await fetch(`/updateProduct/${product.id}`, {
  //       method: 'PUT',

  //       body: JSON.stringify(updatedData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update the product');
  //     }

  //     console.log("Product updated successfully: ", id);
  //     // Update the UI to reflect the update
  //   } catch (error) {
  //     console.error("Error updating product: ", id, error);
  //   }
  // };



  const isOwner = user && productUser && user.emailId === productUser.emailId;

  return (
    <>
      <div
        className="wow fadeInUp group relative overflow-hidden rounded-sm bg-gray-100 shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark"
        data-wow-delay=".1s"
      >
        <Link
          href="/product-details"
          className="relative block aspect-[37/22] w-full"
        >
          <Image src={`data:image/jpeg;base64,${image[0]}`} alt={name} fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href="/product-details"
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {name}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {description}
          </p>
          <div className="mb-6 flex items-center border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Category
                </h4>
                <p className="text-xs text-body-color">
                  {category.toLowerCase().split("_").join(" ")}
                </p>
              </div>
            </div>
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Condition
                </h4>
                <p className="text-xs text-body-color">
                  {condition.toLowerCase().split("_").join(" ")}
                </p>
              </div>
            </div>
            <div className="mr-5 flex items-center">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Price
                </h4>
                <p className="text-xs text-body-color">${price}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    referrerPolicy="no-referrer"
                    src={`data:image/jpeg;base64,${productUser.profilePic}`}
                    alt={productUser.name}
                    fill
                  />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By {productUser.name.split(" ")[0]}
                </h4>
                <p className="text-xs text-body-color">
                  {productUser.emailId}
                </p>
                <p className="text-xs text-body-color">
                  Ph: {productUser.phoneNo}
                </p>
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1">
                Date
              </h4>
              <p className="text-xs text-body-color">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
            <div className="actions-container ml-6 border-l border-body-color border-opacity-10 pr-5 text-sm font-medium text-dark dark:border-white dark:border-opacity-10 dark:text-white xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              {isOwner && (
                <>
                  <button className="update-button ml-3">
                    <FiPocket /> 
                  </button>
                  <button onClick={handleDelete} className="delete-button ml-3">
                    <MdDelete /> 
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
