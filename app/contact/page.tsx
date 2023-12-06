import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | DonHub",
  description: "This is Contact Page for DonHub",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="We're Here to Help!"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
