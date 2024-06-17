"use client"

import { useEffect, useState } from "react";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/parent-categories"); // Adjust the URL as needed
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const renderDropdown = (categories) => {
    return categories.map((category) => (
      <div key={category._id}>
        <div className="relative group">
          <button className="dropdown-button">{category.name}</button>
          {category.children.length > 0 && (
            <div className="dropdown-content">
              {renderDropdown(category.children)}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="category-dropdown">
      {categories.length > 0 ? renderDropdown(categories) : <p>Loading...</p>}
    </div>
  );
};

export default CategoryDropdown;
