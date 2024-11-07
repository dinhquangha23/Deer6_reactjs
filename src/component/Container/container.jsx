import React, { useEffect, useRef, useState } from "react";
import "./container.css";
import Product from "../Product/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Container() {
  const [products, setProducts] = useState([]);
  const [flagRerender, setFlagRerender] = useState(true);
  let slideReft = useRef(0);
  let idInterval= useRef(0);
  useEffect(() => {
    let url =`${import.meta.env.VITE_APP_API}product?start=0&end=6`;
    fetch(url)
      .then((Response) => Response.json())
      .then((Response) => {
        setProducts(Response);
      });
  }, []);
  
  // useEffect(()=>{
  //   idInterval.current = setInterval(()=>{
  //     let currentProduct =
  //     slideReft.current.appendChild(slideReft.current.querySelectorAll(".product")[0])
  //   },8000)
  //   console.log("id :"+idInterval.current)
  //   return ()=>{clearInterval(idInterval.current)}
  // })
    console.log("goi ben ngoai")
  function handleNext() {
    slideReft.current.prepend(slideReft.current.querySelectorAll(".product")[5])
    console.log(idInterval)
    clearInterval(idInterval.current)
    setFlagRerender((pre)=>!pre)
  }
  function handlePre() {
    console.log(slideReft.current.querySelectorAll(".product")[2])
    slideReft.current.appendChild(slideReft.current.querySelectorAll(".product")[0])
    clearInterval(idInterval.current)
    setFlagRerender((pre)=>!pre)
  }
  return (
  
    <div className="container">
      {/* {console.log("render-trong dom")} */}
      <img
        src="https://im.uniqlo.com/global-cms/spa/res29c9020e45b38b1240f5b0c49bd497b3fr.jpg"
        alt=""
      />
      <div className="category-product">
        <div className="category-item">
          <Link to="./all_products">
            <img
              src="https://deer6.vn/wp-content/uploads/2021/11/iconall3-150x150.png"
              alt=""
            />
          </Link>{" "}
          <span className="title">
            <Link to={"/all_products"}>Tất cả sản phẩm</Link>
            {/* <a href=""></a> */}
          </span>{" "}
        </div>
        <div className="category-item">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2021/11/icontop.png"
              alt=""
            />
          </a>{" "}
          <span className="title">
            {" "}
            <a href="">Tops</a>
          </span>{" "}
        </div>
        <div className="category-item">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2021/11/iconbottom.png"
              alt=""
            />
          </a>{" "}
          <span className="title">
            <a href="">Bottoms</a>
          </span>{" "}
        </div>
        <div className="category-item">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2021/11/iconbag-1-150x150.png"
              alt=""
            />
          </a>{" "}
          <span className="title">
            <a href="">Accessories</a>
          </span>{" "}
        </div>
        <div className="category-item">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/09/MEicon5.png"
              alt=""
            />
          </a>{" "}
          <span className="title">
            <a href="">Made Extreme</a>
          </span>{" "}
        </div>
      </div>
      <div className="product-hot">
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x1.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x3-1.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x4.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x5.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x6.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x7.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x2.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x8.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x9.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x10.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x11.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="product-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x12.jpg"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="category-hot">
        <div className="category-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x12.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="category-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x9.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="category-hot_content">
          <a href="">
            <img
              src="https://deer6.vn/wp-content/uploads/2023/06/x9.jpg"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="separator-top">
        <h2>
          <a href="">TOPS</a>
        </h2>
        <div className="separator-top_category">
          <span>
            <a href="">T-Shirt</a>
          </span>
          <span>/</span>
          <span>
            <a href="">Hoodie</a>
          </span>
          <span>/</span>
          <span>
            <a href="">Jacket</a>
          </span>
          <span>/</span>
          <span>
            <a href="">Sweatershirts</a>
          </span>
        </div>
        <div className="product-slide">
          <div className="slide-list" ref={slideReft}>
            {/* Product */}

            {products &&
              products.map((data, index) => {
                return <Product key={index} data={data} />;
              })}
          </div>
          <button className="product-slide-previous" onClick={handlePre}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="product-slide-next" onClick={handleNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
        <div className="slogan-wrap">
          <div className="slogan">
            <ul className="slogan-list">
              <li className="slogan-list-item">
                <span className="item-icon">
                  <i className="fa-solid fa-truck-fast" />
                </span>
                <span className="item-txt">Giao hàng nhanh chóng</span>
              </li>
              <li className="slogan-list-item">
                <span className="item-icon">
                  <i className="fa-solid fa-arrows-rotate" />
                </span>
                <span className="item-txt">5 ngày đổi hàng</span>
              </li>
              <li className="slogan-list-item">
                <span className="item-icon">
                  <i className="fa-brands fa-facebook-messenger" />
                </span>
                <span className="item-txt">Tư vấn nhiệt tình</span>
              </li>
              <li className="slogan-list-item">
                <span className="item-icon">
                  <i className="fa-solid fa-shield-halved" />
                </span>
                <span className="item-txt">Sản phẩm chất lượng</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}