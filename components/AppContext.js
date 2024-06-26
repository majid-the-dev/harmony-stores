// "use client";

// import { SessionProvider } from "next-auth/react";
// import { createContext, useEffect, useState } from "react";

// export const CartContext = createContext({});

// export const AppProvider = ({ children }) => {
//   const [cartProducts, setCartProducts] = useState([]);
//   const ls = typeof window !== "undefined" ? window.localStorage : null;

//   useEffect(() => {
//     if (ls && ls.getItem("cart")) {
//       setCartProducts(JSON.parse(ls.getItem("cart")));
//     }
//   }, []);

//   const clearCart = () => {
//     setCartProducts([]);
//     saveCartProductsToLocalStorage([]);
//   };

//   const removeCartProduct = (indexToRemove) => {
//     setCartProducts((prevCartProducts) => {
//       const newCartProducts = prevCartProducts.filter(
//         (v, index) => index !== indexToRemove
//       );
//       saveCartProductsToLocalStorage(newCartProducts);
//       return newCartProducts;
//     });
//   };
//   8;

//   const saveCartProductsToLocalStorage = (cartProducts) => {
//     if (ls) {
//       ls.setItem("cart", JSON.stringify(cartProducts));
//     }
//   };

//   const addToCart = (product) => {
//     setCartProducts((prevProducts) => {
//       const newProducts = [...prevProducts, { ...product }];
//       saveCartProductsToLocalStorage(newProducts);
//       return newProducts;
//     });
//   };

//   return (
//     <SessionProvider>
//       <CartContext.Provider
//         value={{
//           cartProducts,
//           setCartProducts,
//           addToCart,
//           removeCartProduct,
//           clearCart,
//         }}
//       >
//         {children}
//       </CartContext.Provider>
//     </SessionProvider>
//   );
// };

"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext({});
export const SearchContext = createContext({});

export const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  const [searchBoxAnimation, setSearchBoxAnimation] = useState("");
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const localCart = JSON.parse(ls.getItem("cart"));
      fetchUpdatedCartProducts(localCart);
    }
  }, []);

  const fetchUpdatedCartProducts = async (localCart) => {
    try {
      const response = await axios.get("/api/products");
      const allProducts = response.data;

      // Filter the products to include only those in the cart
      const newCartProducts = localCart.map((localProduct) => {
        const updatedProduct = allProducts.find(
          (p) => p._id === localProduct._id
        );
        return updatedProduct
          ? { ...localProduct, ...updatedProduct }
          : localProduct;
      });

      setCartProducts(newCartProducts);
      saveCartProductsToLocalStorage(newCartProducts);
    } catch (error) {
      console.error("Failed to fetch updated product details", error);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  };

  const removeCartProduct = (indexToRemove) => {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  };

  const saveCartProductsToLocalStorage = (cartProducts) => {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  };

  const addToCart = (product) => {
    setCartProducts((prevProducts) => {
      const newProducts = [...prevProducts, { ...product }];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  };

  const toggleSearchBox = () => {
    setSearchBox((prev) => {
      if (prev) {
        setSearchBoxAnimation("animate__fadeInUp");
      } else {
        setSearchBoxAnimation("animate__fadeInDown");
      }
      return !prev;
    });
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        <SearchContext.Provider value={{ searchBox, toggleSearchBox, searchBoxAnimation }}>
          {children}
        </SearchContext.Provider>
      </CartContext.Provider>
    </SessionProvider>
  );
};
