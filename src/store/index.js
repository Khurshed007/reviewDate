import { configureStore } from "@reduxjs/toolkit";
import bewertung from "./bewertung";
export const store = configureStore({
    reducer : {
        //  reviewSlice : reviewSlice,
         bewertung : bewertung
    }
})