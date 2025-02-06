import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Agar local storage me totalItems already pade hue hai toh vo dikao otherwise 0 dikhao
const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // Add to cart function
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      // If the course is already in the cart, do not modify the quantity
      if (index >= 0) {
        toast.error("Course is already in the cart");
        return;
      }

      // If the course is not in the cart then add it to the cart
      state.cart.push(course);

      // Also update the total quantity and price
      state.totalItems++;
      state.total += course.price;

      // Update the local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      // show toast
      toast.success("Course added to th cart");
    },

    // Remove from cart function
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      // If the course is found in the cart, remove it
      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);

        // Update the local storage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        // Show toast
        toast.success("Course removed from the cart");
      }
    },

    // Reset cart function
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Update Local Storage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

    //   Show toast
    toast.success("All the courses removed from the cart");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
