import React, {useContext} from 'react';
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";


const SingleProduct = ({ product }: { product: Product }) => {

  const { user } = useContext(AuthContext);
  const { name, description, image, date, condition, category, price } =
    product;
  
    if (!user) {
      return <div>Loading...</div>; // or any other loading state
    }
    
  return (
    <>
      <div
        className="wow fadeInUp group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark"
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
          <div className="flex items-center mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Category
                </h4>
                <p className="text-xs text-body-color">
                  {product.category.toLowerCase().split('_').join(' ')}
                </p>
              </div>
            </div>
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Condition
                </h4>
                <p className="text-xs text-body-color">
                  {product.condition.toLowerCase().split('_').join(' ')}
                </p>
              </div>
            </div>
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Price
                </h4>
                <p className="text-xs text-body-color">
                  ${product.price}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={`data:image/jpeg;base64,${product.user.profilePic}`}
                    alt={product.user.name}
                    fill
                  />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By {product.user.name.split(" ")[0]}
                </h4>
                <p className="text-xs text-body-color">
                  {product.user.emailId}
                </p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
