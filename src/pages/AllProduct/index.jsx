import "./AllProduct.css";
import Product from "../../component/Product/product";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = "http://localhost:3000/product";
    fetch(url)
      .then((Response) => Response.json())
      .then((Response) => {
        setProducts(Response);
      });
  }, []);
  return (
    <div className="container">
      <div className="redirect">
        <Link to={"/"}><span>Trang chủ</span></Link>
        <i className="fa-solid fa-angle-right" />
        <Link to={"/all_products"} >
          <span>Tất cả sản phẩm</span>
        </Link>
      </div>
      <div className="container-title">
        <h1>Tất cả sản phẩm</h1>
      </div>
      <div className="list-product">
        {products &&
          products.map((data, index) => {
            return <Product key={index} data={data} />;
          })}
      </div>
    </div>
  );
}
