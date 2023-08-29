import { HomeProps } from "@/pages";
import { Dispatch, ReactNode, SetStateAction } from "react";

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
  defaultPriceId: any;
  priceId: any;
  priceNumber: number;
  price: any;
  id: any;
  products: {
    formattedPrice: ReactNode;
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceNumber: any;
  }[];
}

export interface CartButtonProps {
  color: string;
  svgColor: string;
  product?: HomeProps | undefined;
}

export interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}
