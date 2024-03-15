import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./product.selectors";
import { ProductState } from "./product.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./product.sagas";
import { IProductFe } from "@/models/client/ProductFe";
import productId from "@/pages/api/products/[productId]";

const initialState: ProductState = {
  list: [],
  current: null,
};

export const productStore = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(extraActions.postProducts.success, (state, action) => {
      state.list = [...state.list, action.payload.data.product];
    });
    builder.addCase(
      extraActions.deleteProductsByProductId.success,
      (state, action) => {
        const productId = action.payload.prepareParams.productId;
        state.list = state.list.filter(
          (product: IProductFe) => product._id !== productId,
        );
      },
    );
    builder.addCase(extraActions.getProducts.request, (state, action) => {
      state.list = null;
    });
    builder.addCase(extraActions.getProducts.success, (state, action) => {
      state.list = action.payload.data.products;
    });
    builder.addCase(
      extraActions.getProductsByProductId.success,
      (state, action) => {
        state.current = action.payload.data.product;
      },
    );
    builder.addCase(
      extraActions.patchProductsByProductId.success,
      (state, action) => {
        state.current = action.payload.data.product;
        state.list = (state.list ?? []).map((product: IProductFe) => {
          if (product._id === action.payload.data.product._id) {
            return action.payload.data.product;
          }
          return product;
        });
      },
    );
  },
});

export { selectors, sagas };
