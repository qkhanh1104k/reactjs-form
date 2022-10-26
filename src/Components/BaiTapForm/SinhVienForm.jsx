import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addNewSinhVien,
  changeData,
} from "../../redux/reducers/mangSinhVienReducer";

class SinhVienForm extends Component {
  //B2:xây dựng state tên giống với id
  state = {
    values: {
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
    isSubmit: true,
  };

  handleChangeInput = (e) => {
    //lấy giá trị mỗi lần value input thay đổi
    let { id, value } = e.target; //id:hoTen, value: nguyen van buoi

    let newValues = { ...this.state.values };
    newValues[id] = value;

    let newErrors = { ...this.state.errors };
    //Xử lý lỗi
    let messError = "";
    if (value.trim() == "") {
      messError = id + " không được bỏ trống !";
    } else {
      let dataType = e.target.getAttribute("data-type");

      if (dataType === "number") {
        let regexNumber = /^\d+$/;
        if (!regexNumber.test(value)) {
          messError = id + " phải nhập số !";
        }
      }
      if (dataType === "email") {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regexEmail.test(value)) {
          messError = id + " chưa đúng định dạng !";
        }
      }
    }

    newErrors[id] = messError;

    let submit = false;
    for (let key in newValues) {
      if (newValues[key].toString().trim() === "") {
        submit = true;
      }
    }
    //setState
    this.setState(
      {
        values: newValues,
        errors: newErrors,
        isSubmit: submit,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault(); // chặn sự kiện reload của browser khi submit
    console.log("submit", this.state);
    //kiểm tra error trước khi submit

    //lấy ra object error từ state
    let { errors } = this.state;
    for (let key in errors) {
      if (errors[key] !== "") {
        alert("Dữ liệu không hợp lệ");
        //dừng lại
        return;
      }
    }

    const newSinhVien = { ...this.state.values };
    //cập nhật lại state
    const action = addNewSinhVien(newSinhVien);
    this.props.dispatch(action);
    this.luuStorage();
  };
  
  handleUpdate = (e) => {
    e.preventDefault();
    const newSinhVien = { ...this.state.values };
    const action = changeData(newSinhVien);
    this.props.dispatch(action);
  };

  luuStorage = () => {
  let stringArrSinhVien = JSON.stringify(this.props.mangSinhVien);
    localStorage.setItem("arrSinhVien", stringArrSinhVien);
  };
  
  

  render() {
    return (
      //B1:xây dựng Ui
      <div className="container">
        <div className="card text-start">
          <div className="card-header bg-dark text-white">
            <h3>Thông tin sinh viên</h3>
          </div>
          <div className="card-body">
            <form className="container">
              <div className="row">
                <div className="form-group col-6">
                  <span>Mã SV</span>
                  <input
                    className="form-control"
                    id="maSV"
                    name="maSV"
                    onInput={this.handleChangeInput}
                    data-type="number"
                    value={this.state.values.maSV}
                  />
                  <p className="text-danger">{this.state.errors.maSV}</p>
                </div>
                <div className="form-group col-6">
                  <span>Họ tên</span>
                  <input
                    className="form-control"
                    id="hoTen"
                    name="hoTen"
                    onInput={this.handleChangeInput}
                    value={this.state.values.hoTen}
                  />
                  <p className="text-danger">{this.state.errors.hoTen}</p>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <span>Email</span>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    onInput={this.handleChangeInput}
                    data-type="email"
                    value={this.state.values.email}
                  />
                  <p className="text-danger">{this.state.errors.email}</p>
                </div>
                <div className="form-group col-6">
                  <span>Số điện thoại </span>
                  <input
                    className="form-control"
                    id="soDienThoai"
                    name="soDienThoai"
                    onInput={this.handleChangeInput}
                    data-type="number"
                    value={this.state.values.soDienThoai}
                  />
                  <p className="text-danger">{this.state.errors.soDienThoai}</p>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 text-right">
                    <button
                      className="btn btn-success me-2"
                      disabled={this.state.isSubmit}
                      onClick={this.handleSubmit}>
                      Thêm sinh viên
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.handleUpdate}>
                      Cập nhật
                    </button>
                  </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sinhVienEdit.maSV !== this.props.sinhVienEdit.maSV) {
      this.setState({
        values: this.props.sinhVienEdit,
      });
    }
    if (this.props.mangSinhVien !== "") {
      this.luuStorage();
    }
  }
}
const mapStateToProps = (state) => ({
  sinhVienEdit: state.mangSinhVienReducer.sinhVienEdit,
  mangSinhVien: state.mangSinhVienReducer.mangSinhVien,
});
//=>{return{}} ~ =>({})

export default connect(mapStateToProps)(SinhVienForm);
