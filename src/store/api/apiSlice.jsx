// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all Product from api
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    // data storage
    let allproduct = [];
    let total = 0;
    let skip = 0;
    const limit = 30;

    // 
    do {
      const res = await axios.get(`https://dummyjson.com/products`, {
        params: { limit, skip },
      });

      const data = res.data;
      allproduct.push(...data.products);

      total = data.total;
      skip += limit;

    } while (allproduct.length < total);
    return allproduct;
  },
);


// Create a slice for products
const productsSlice = createSlice({
  name: "products",
  initialState: {
    Products: [],
    status: "idle",
    error: null,
    value:0
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {value} = productsSlice.actions
export default productsSlice.reducer;