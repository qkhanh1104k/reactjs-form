import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mangSinhVien: [
    // {
    //   maSV: 1,
    //   hoTen: "nguyen van A",
    //   soDienThoai: "0909090909",
    //   email: "hlei@gmail.com",
    // },
  ],
  sinhVienEdit: {},
};

const mangSinhVienReducer = createSlice({
  name: "mangSinhVienReducer",
  initialState,
  reducers: {
    addNewSinhVien: (state, { type, payload }) => {
      const newSinhVien = payload;
      state.mangSinhVien.push(newSinhVien);
    },
    deleteSinhVien: (state, { type, payload }) => {
      const maSV = payload;
      state.mangSinhVien = state.mangSinhVien.filter(
        (sinhvien) => sinhvien.maSV !== maSV
      );
    },
    editSinhVien: (state, { type, payload }) => {
      const sinhVienClick = payload;
      state.sinhVienEdit = sinhVienClick;
      console.log("sinhVienEdit", state.sinhVienEdit);
    },
    changeData: (state, { type, payload }) => {
      const { maSV, hoTen, email, soDienThoai } = payload;
      let sinhVienUpdate = state.mangSinhVien.find(
        (sinhVien) => sinhVien.maSV === maSV
      );
      sinhVienUpdate.maSV = maSV;
      sinhVienUpdate.hoTen = hoTen;
      sinhVienUpdate.email = email;
      sinhVienUpdate.soDienThoai = soDienThoai;
    },
    
  },
});

export const { addNewSinhVien, deleteSinhVien, editSinhVien, changeData } =
  mangSinhVienReducer.actions;

export default mangSinhVienReducer.reducer;




