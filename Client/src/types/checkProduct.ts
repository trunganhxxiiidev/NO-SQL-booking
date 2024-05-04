import type Product from "./Product";

export default interface CheckProduct {
  product_id: string;
  id: string;
  product: Product;
  supplier: {
    name: string;
  };
  code: string;
  checked: string;
  expiry_date: string;
}
