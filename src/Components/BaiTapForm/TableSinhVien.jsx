import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteSinhVien,
  editSinhVien,
} from "../../redux/reducers/mangSinhVienReducer";

class TableSinhVien extends Component {
  render() {
    console.log(this.props.mangSinhVien);
    return (
      <div className="container">
        <div class="input-group rounded col-4">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.mangSinhVien.map((sinhVien, index) => {
              return (
                <tr key={index}>
                  <td>{sinhVien.maSV}</td>
                  <td>{sinhVien.hoTen}</td>
                  <td>{sinhVien.soDienThoai}</td>
                  <td>{sinhVien.email}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        const action = editSinhVien(sinhVien);
                        this.props.dispatch(action);
                      }}>
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const action = deleteSinhVien(sinhVien.maSV);
                        this.props.dispatch(action);
                      }}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  mangSinhVien: state.mangSinhVienReducer.mangSinhVien,
});
export default connect(mapStateToProps)(TableSinhVien);
