import { configureStore } from "@reduxjs/toolkit"; 
import mangSinhVienReducer from "./reducers/mangSinhVienReducer";

export const store = configureStore({
  reducer:{
    //nơi chứa toàn bộ state của ứng dụng
     mangSinhVienReducer:mangSinhVienReducer,                         
  }
})