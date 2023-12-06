"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";

const EditProfileForm = () => {
  const router = useRouter();
  const { user, signIn } = useContext(AuthContext);
  const [name, setName] = useState(user?.name ?? "");
  const [profilePic, setProfilePic] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value.trim());
  };

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
    //console.log("Selected profile picture:", event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    // console.log(formData);
    // console.log(user.customId);
    try {
      const response = await fetch(
        `http://localhost:8080/users/updateUser/${user.customId}`,
        {
          method: "PUT",
          body: formData,
        },
      );

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
        alert("Profile updated successfully!");
        router.push("/");
      } else if (response.status === 404) {
        alert(responseData.message || responseData);
      } else if (response.status === 500) {
        alert(responseData.message || responseData);
      }
      else {
        alert(responseData.message || responseData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred, please try again.");
    }
  };

  if (!user) {
    return <div>Loading...</div>; // or any other loading state
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <label
          htmlFor="name"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Edit your Name{" "}
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          value={name}
          onChange={handleNameChange}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="profilePic"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          {" "}
          Edit your Profile Pic{" "}
        </label>
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
      </div>
      <div className="mb-6">
        <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
          Edit Profile
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
