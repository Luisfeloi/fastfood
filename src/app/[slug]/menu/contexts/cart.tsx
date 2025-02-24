"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, 'name' | 'price' | 'id' | 'imageUrl'> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  totalQuantity: 0,
  toggleCart: () => { },
  addProduct: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { },
  removeProduct: () => { }
})

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const total = products.reduce((acc, product) => {
    return acc = product.price * product.quantity;
  }, 0);
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity
  }, 0);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some((prevProduct) => prevProduct.id === product.id)
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts(prevProducts => {
      return prevProducts.map((prevProducts) => {
        if (prevProducts.id === product.id) {
          return {
            ...prevProducts,
            quantity: prevProducts.quantity + product.quantity
          };
        }
        return prevProducts;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts(prevProducts => {
      return prevProducts.map((prevProducts) => {
        if (prevProducts.id === productId) {
          if (prevProducts.quantity === 1) {
            return prevProducts
          }
          return {
            ...prevProducts,
            quantity: prevProducts.quantity - 1
          };
        }
        return prevProducts;
      });
    });
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 }
      })
    })
  }

  const removeProduct = (productId: string) => {
    setProducts(prevproducts => prevproducts.filter(prevproducts => prevproducts.id !== productId));
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        total,
        totalQuantity,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}>
      {children}
    </CartContext.Provider>
  )
}