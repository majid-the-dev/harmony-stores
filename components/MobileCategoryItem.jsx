"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMinus, FiPlus } from "react-icons/fi";

const MobileCategoryItem = ({ category, closeSidebar }) => {
  const [showCategories, setShowCategories] = useState(false);

  const categoryName = encodeURIComponent(category.name.replace(/ /g, "-"));
  if (category.children.length > 0) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <Link href={`/category/${categoryName}`} className="text-[13px] font-medium outline-none" onClick={closeSidebar}>
            {category.name}
          </Link>
          <button onClick={() => setShowCategories(!showCategories)} className="text-[15px] outline-none">
            {showCategories ? <FiMinus /> : <FiPlus />}
          </button>
        </div>
        {showCategories && (
          <div className="flex flex-col gap-6 mt-6">
            {category.children.map((child) => (
              <MobileCategoryItem key={child._id} category={child} closeSidebar={closeSidebar} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Link onClick={closeSidebar} href={`/category/${categoryName}`} key={category._id} className="text-[13px] font-medium outline-none">
        {category.name}
      </Link>
    );
  }
};

export default MobileCategoryItem;
