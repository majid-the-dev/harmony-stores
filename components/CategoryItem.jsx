// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSub,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
// import Link from "next/link";

// const CategoryItem = ({ category }) => {
//   if (category.children.length > 0) {
//     return (
//       <MenubarSub key={category._id}>
//         <MenubarSubTrigger className="anmimation text-xs font-medium p-2 focus:bg-orange-100">
//           <Link href={`/category/${category._id}`}>
//             {category.name}
//           </Link>
//         </MenubarSubTrigger>
//         <MenubarSubContent>
//           {category.children.map((child) => (
//             <CategoryItem key={child._id} category={child} />
//           ))}
//         </MenubarSubContent>
//       </MenubarSub>
//     );
//   } else {
//     return (
//       <MenubarItem className="animation text-xs font-medium p-2 focus:bg-orange-100" key={category._id}>
//         <Link href={`/category/${category._id}`}>
//           {category.name}
//         </Link>
//       </MenubarItem>
//     ) 
//   }
// };

// export default CategoryItem;







import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

const CategoryItem = ({ category }) => {
  const categoryName = encodeURIComponent(category.name.replace(/ /g, "-"));
  if (category.children.length > 0) {
    return (
      <MenubarSub key={category._id}>
        <MenubarSubTrigger className="anmimation text-xs font-medium p-2 focus:bg-orange-100">
          <Link href={`/category/${categoryName}`}>
            {category.name}
          </Link>
        </MenubarSubTrigger>
        <MenubarSubContent>
          {category.children.map((child) => (
            <CategoryItem key={child._id} category={child} />
          ))}
        </MenubarSubContent>
      </MenubarSub>
    );
  } else {
    return (
      <MenubarItem className="animation text-xs font-medium p-2 focus:bg-orange-100" key={category._id}>
        <Link href={`/category/${categoryName}`}>
          {category.name}
        </Link>
      </MenubarItem>
    ) 
  }
};

export default CategoryItem;
