import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Agar local storage me totalItems already pade hue hai toh vo dikao otherwise 0 dikhao
const initialState = {
    totalItems : localStorage.getItem("totalItems") ? 
    JSON.parse(localStorage.getItem("totalItems")) :  
    0
};

const cartSlice = createSlice({
    name: "cart", 
    initialState: initialState,
    reducers: {
        setTotalItems(state, value){
            state.token = value.payload;
        }
        // Add to cart function 
        // Remove from cart function 
        // Reset cart function  
    }
});

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;