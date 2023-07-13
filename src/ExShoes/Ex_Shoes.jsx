import React, { Component } from "react";
import { data_shoes } from "./data_shoes";
import GioHang from "./GioHang";
import ItemShoe from "./ItemShoe";

export default class Ex_Shoes extends Component {
  state = {
    shoes: data_shoes,
    gioHang: [],
  };
  // render ra màn h
  renderContent = () => {
    return this.state.shoes.map((item, index) => {
      return (
        <ItemShoe
          handleAddToCart={this.handleAddToCart}
          data={item}
          key={index}
        />
      );
    });
  };
  // cách 1
  // handleAddToCart = (shoe) => {
  //   let newGioHang = [...this.state.gioHang, shoe];
  //   //this.setState là bất đồng bộ
  //   this.setState({ gioHang: newGioHang }, () => {
  //     console.log("out render", this.state.gioHang.length);
  //   });
  // };
  // cách 2
  handleAddToCart = (shoe) => {
    // đếm số lượng
    let index = this.state.gioHang.findIndex((item) => {
      return item.id == shoe.id;
    });
    let cloneGioHang = [...this.state.gioHang];
    // th1 trong giỏ hàng chưa có sản phẩm
    if (index == -1) {
      let newSp = { ...shoe, soLuong: 1 };
      cloneGioHang.push(newSp);
    } else {
      cloneGioHang[index].soLuong++;
    }
    this.setState({ gioHang: cloneGioHang });

    // th2 trong giỏ hàng đã có sản phẩm
  };
  handleChangeQuantity = (idShoe, value) => {
    let index = this.state.gioHang.findIndex((shoe) => {
      return shoe.id == idShoe;
    });
    if (index == -1) return;
    let cloneGioHang = [...this.state.gioHang];

    cloneGioHang[index].soLuong = cloneGioHang[index].soLuong + value;

    cloneGioHang[index].soLuong == 0 && cloneGioHang.splice(index, 1);
    this.setState({ gioHang: cloneGioHang });
  };

  render() {
    console.log("In render", this.state.gioHang.length);
    return (
      <div className="containerp y-5">
        <h1>
          <mark className="text-danger ">Shoes Shop</mark>
        </h1>

        <div className="row"> {this.renderContent()} </div>
        {this.state.gioHang.length > 0 && (
          <GioHang
            handleChangeQuantity={this.handleChangeQuantity}
            gioHang={this.state.gioHang}
          />
        )}
      </div>
    );
  }
}
