import { supplier_ikom } from "@/configs/commons";

const getPriceOfSupplier = (suppliers: any[]) => {
  const supplier_id = supplier_ikom;

  const supplier_info = suppliers.find((i: any) => i.id == supplier_id);

  return supplier_info ? supplier_info.pivot.price : 0;
};

export { getPriceOfSupplier };
