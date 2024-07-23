import React, { useCallback } from "react";
import "./product.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


export default function Product({data}) {
  let fomartMoney = useCallback((x)=>{
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },[])

  return (
    <div className="product">
      <div className="product-info">
        <div className="thumnail">
        <Link to={`/product_detail/${data.id}`}>
          <img
            className="img-1"
            src={data.firstimage}
            alt=""
          />
          <img
            className="img-2"
            src={data.secondimage}
            alt=""
          />
          </Link>
        </div>
        <div className="description">
          <Link to={`/product_detail/${data.id}`}>
            <span>{data.Title}</span>
          </Link>
          <span className="price">{fomartMoney(data.price)}₫</span>
        </div>
      </div>
      <div className="product-function">
        <ul className="list-function">
          <li className="function-item quick-search">
          <Tippy content="Search" placement="left">
            <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            </Tippy>
          </li>
          <li className="function-item wishlist">
          <Tippy content="Wishlist" placement="left">
            <button>
            <FontAwesomeIcon icon={faHeart} />
            </button>
            </Tippy>
          </li>
          <Link to={`/product_detail/${data.id}`}>
          <li className="function-item option">
            <Tippy content="Cart" placement="left">
            <button>
            <FontAwesomeIcon icon={faCartShopping} />
            </button>
            </Tippy>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
