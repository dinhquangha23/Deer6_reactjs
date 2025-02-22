import "./AllProduct.css";
import Product from "../../component/Product/product";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function AllProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = `${import.meta.env.VITE_APP_API}product`;
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
        <i><FontAwesomeIcon icon={faAngleRight} /></i>
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
