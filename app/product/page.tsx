
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Sidebar from "@/components/ProductGrid/SideBar";

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Page | DonHub",
  description: "This is Products Page for DonHub",
  // other metadata
};

const Product = () => {
  return (
    <>
      <Breadcrumb
        pageName="Products"
        description="Discover More with DonHub: From Tech Tidbits to Trendy Threads, Furnishing Finesse to Melodic Must-haves – Elevate Your Campus Life!"
      />
      <div className="flex">
        <Sidebar />
        <main>
          <section className="pb-[120px] pt-[0px]">
            <div className="container">
              <div className="-mx-4 flex flex-wrap justify-center">
                <ProductGrid/>
              </div>

              <div
                className="wow fadeInUp -mx-4 flex flex-wrap"
                data-wow-delay=".15s"
              >
                {/* <div className="w-full px-4">
                  <ul className="flex items-center justify-center pt-8">
                    <li className="mx-1">
                      <a
                        href="#0"
                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                      >
                        Prev
                      </a>
                    </li>
                    <li className="mx-1">
                      <a
                        href="#0"
                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                      >
                        1
                      </a>
                    </li>
                    <li className="mx-1">
                      <a
                        href="#0"
                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                      >
                        2
                      </a>
                    </li>
                    <li className="mx-1">
                      <a
                        href="#0"
                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                      >
                        3
                      </a>
                    </li>
                    <li className="mx-1">
                      <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
                        ...
                      </span>
                    </li>
                    <li className="mx-1">
                      <a
                        href="#0"
                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                      >
                        12
                      </a>
                    </li>
                    <li className="mx-1">
                      <a
                        href="#0"
                        className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Product;
