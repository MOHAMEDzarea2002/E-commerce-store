import { createSlice } from "@reduxjs/toolkit";

const CarteSlice = createSlice({
  name: "Cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("ProductItems")) || [],
  },

  reducers: {
    // Add Product
    addCart: (state, action) => {
      const product = action.payload;
      const existingItems = state.items.find((item) => {
        return item.id === product.id;
      });

      if (existingItems) {
        existingItems.Quantity += 1;
        console.log(product);
      } else {
        state.items.push({ ...product, Quantity: 1 });
      }
      localStorage.setItem("ProductItems", JSON.stringify(state.items));
    },
    // remove Product
    removeCart: (state, action) => {
      const product = action.payload;
      //  Check on Product In state Items
      const existingItems = state.items.find((item) => {
        return item.id === product.id;
      });
      //  Check True Delete Product
      if (existingItems) {
        state.items.shift();
      }
      // Update State Items in localStorage

      localStorage.setItem("ProductItems", JSON.stringify(state.items));
    },
    // Increment Quantity Product
    Increment: (state, action) => {
      const Product = action.payload;
      //  Check on Product In state Items
      const items = state.items.find((item) => {
        return item.id === Product;
      });
      //  Check True Increment Quantity  Product
      if (items) {
        items.Quantity += 1;
      }
      // Update State Items in localStorage

      localStorage.setItem("ProductItems", JSON.stringify(state.items));
    },
    // Decrement Quantity Product
    Decrement: (state, action) => {
      const Product = action.payload;
      //  Check on Product In state Items
      const items = state.items.find((item) => {
        return item.id === Product;
      });
      //  Check True items And items Quantity >=1 Decrement Quantity Product
      if (items && items.Quantity >= 1) {
        items.Quantity -= 1;
      }
      // Update State Items in localStorage
      localStorage.setItem("ProductItems", JSON.stringify(state.items));
    },
  },
});

export const { addCart, Increment, Decrement, removeCart } = CarteSlice.actions;
export default CarteSlice.reducer;
