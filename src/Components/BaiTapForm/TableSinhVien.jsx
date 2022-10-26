import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteSinhVien,
  editSinhVien,
} from "../../redux/reducers/mangSinhVienReducer";

class TableSinhVien extends Component {
  state = {
    searchText: "",
  };
  handleChangeSearch = (e) => {
    let newSearchText = { ...this.state.searchText };
    newSearchText = e.target.value;
    this.setState(
      {
        searchText: newSearchText,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    console.log(this.props.mangSinhVien);
    return (
      <div className="container">
        <div className="input-group rounded col-4">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Nhập mã sinh viên"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={this.handleChangeSearch}
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
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
            {this.props.mangSinhVien
              .filter((sinhVien) =>
                sinhVien.maSV.toLowerCase().includes(this.state.searchText)
              )
              .map((sinhVien, index) => {
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
