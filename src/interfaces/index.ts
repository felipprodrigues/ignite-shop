import { HomeProps } from "@/pages";
import { Dispatch, SetStateAction } from "react";

export interface CartProps {
  setProductData: Dispatch<SetStateAction<{}>>;
  productData: object[];
  isSidepanelOpen: boolean;
  toggleSidepanel: () => void;
  handleAddItemToCart: (product: HomeProps) => void;
  removeItemFromCart: (id: string) => void;
  cart: object[];
  cartTotalPrice: number;
}

export interface HomeProps {
  priceNumber: number;
  price: any;
  id: any;
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceNumber: any;
  }[];
}
