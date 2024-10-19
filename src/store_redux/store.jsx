import { configureStore } from "@reduxjs/toolkit";
import allstorereducer from "./allstorereducer";

export const store=configureStore({
    reducer:{allstorereducer}
});