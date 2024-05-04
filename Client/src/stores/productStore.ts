import { supplier_ikom } from "@/configs/commons";
import { getProductList, getProductDetail, getCheckCodeInfo } from "@/services/getAPI";
import type Pagination from "@/types/Pagination";
import type Product from "@/types/Product";
import type CheckProduct from "@/types/checkProduct";
import { defineStore } from "pinia";

export const productStore = defineStore({
  id: "product",
  state: () => ({
    top_products: {} as any,
    fetching: false,
    list: [] as Product[],
    pagination: {} as Pagination,
    detail: {} as Product,
    check_product: {} as CheckProduct,
  }),

  actions: {
    fetchTopProducts() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getProductList({
          "filter[suppliers.id]": supplier_ikom,
          include: "suppliers,origin,categories",
        })
          .then(({ data }) => {
            this.top_products = data.data.slice(0, 8);
            this.fetching = false;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    fetchProductList(params: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getProductList({
          ...params,
          "filter[suppliers.id]": supplier_ikom,
          include: "suppliers,origin,categories",
        })
          .then(({ data }) => {
            this.list = data.data;
            this.pagination = data;
            this.fetching = false;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    fetchDetailProduct(id: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getProductDetail(id, {
          include: "origin,categories,reviewsCount,images,tags,suppliers",
        })
          .then(({ data }) => {
            this.detail = data;
            this.fetching = false;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
    fetchCheckInfo(id: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getCheckCodeInfo(id, {
          include: "product,supplier",
        })
          .then(({ data }) => {
            this.check_product = data;
            this.fetching = false;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
  },
});
