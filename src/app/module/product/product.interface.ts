export type TProductVariant = {
  type: string;
  value: string;
};

export type TInventoryDetails = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TProductVariant[];
  inventory: TInventoryDetails;
};
