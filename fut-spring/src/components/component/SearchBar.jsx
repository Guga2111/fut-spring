import React from "react";
import { Input } from "@/components/ui/input"; 
import { FiSearch } from "react-icons/fi"; 

export default function SearchBar({ searchTerm, setSearchTerm }) {

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

  return (
    <div className="flex items-center space-x-2 w-full max-w-md">
      <div className="relative w-full">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10" 
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
    </div>
  );
}
