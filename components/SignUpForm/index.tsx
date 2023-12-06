"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from '../../contexts/AuthContext'

const SignUpForm = () => {

  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      let message = "";
      if (!email && !password) {
        message = "Please enter both email and password.";
      } else if (!email) {
        message = "Please enter an email.";
      } else {
        message = "Please enter a password.";
      }
      alert(message);
      return; // Stop the function if validation fails
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    // phoneNumber is optional
    if (phoneNumber) {
      formData.append("phoneNumber", phoneNumber);
    }
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await fetch(`http://localhost:8080/users`, {
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
        signIn(responseData);
        router.push('/');
        
      } else if (response.status === 409) {
        alert(responseData.message || responseData);
      } else {
        alert(responseData.message || responseData);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <label
          htmlFor="email"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          School Email{" "}
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="password"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Password{" "}
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="phone"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Phone Number{" "}
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="profilePicture"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Profile Picture{" "}
        </label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-6">
        <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
