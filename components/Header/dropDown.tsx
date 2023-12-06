// DropdownIndex.tsx

import React, { useContext } from 'react';
import Link from "next/link";
import { AuthContext } from '../../contexts/AuthContext';

const Dropdown = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white">
      <Link href="/edit-profile" className="block px-2 py-1 text-sm text-gray-700 hover:bg-primary hover:rounded-t-md">Edit Profile
      </Link>
      <Link href="/post-a-product" className="block px-2 py-1 text-sm text-gray-700 hover:bg-primary">Post a Product
      </Link>
      <button onClick={signOut} className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-primary hover:rounded-b-md">Sign Out</button>
    </div>
  );
};

export default Dropdown;
