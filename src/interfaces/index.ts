import { Dispatch, ReactNode, SetStateAction } from "react";

export interface CartProps {
  setProductData: React.Dispatch<React.SetStateAction<any[]>>;
  productData: object[];
  isSidepanelOpen: boolean;
  toggleSidepanel: () => void;
  handleAddItemToCart: (product: HomeProps) => void;
  removeItemFromCart: (id: string) => void;
  cart: object[];
  cartTotalPrice: string;
  handleBuyProduct: () => void;
  isCreatingCheckoutSession: boolean;
}

export interface HomeProps {
  price: number;
  id: any;
  priceId: any;
  products: {
    nameId: string;
    formattedPrice: ReactNode;
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    priceNumber: any;
  }[];
}

export interface CartButtonProps {
  id: any;
  color: string;
  svgColor: string;
  product?:
    | {
        formattedPrice?: ReactNode;
        id?: string;
        name?: string;
        imageUrl?: string;
        price?: number;
        priceNumber?: any;
      }
    | undefined;
}

export interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export interface ProductProps {
  product: {
    priceNumber: number;
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    priceId: string;
    nameId: string;
  };
}
