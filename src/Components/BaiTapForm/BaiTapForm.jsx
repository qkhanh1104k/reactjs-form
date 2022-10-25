import React, { Component } from 'react'
import SinhVienForm from './SinhVienForm'
import TableSinhVien from './TableSinhVien'

export default class BaiTapForm extends Component {
  render() {
    return (
      <div className='container'>
        <h3>Bài tập Form</h3>
        <SinhVienForm/>
        <TableSinhVien/>
      </div>
    )
  }
}
