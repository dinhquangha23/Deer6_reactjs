import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping,faMagnifyingGlass,faUser,faHeart, faBars} from'@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useState } from "react";
function Header({toggle}) {
  const [active,setActive]= useState(false)
  function showMenu(){
    setActive((Pre)=>!Pre)
  }
  const closeMenuBar=()=>{setActive(false)}
  return (
    <header>
      <div className="content">
        <div className="logo">
          <Link to={"/"}>
          <img
            src="https://deer6.vn/wp-content/uploads/2021/11/logo-black.png"
            alt=""
          />
          </Link>
        </div>
        <div className="menubar">
          <ul className={`main-menu ${active ? " active" :""}`}>
            <li onClick={closeMenuBar}> 
              <Link to={"/"}>Home</Link>
            </li>
            <li onClick={closeMenuBar}>
              <Link to={"/all_products"}>All Products</Link>
            </li>
            <li onClick={closeMenuBar}>
              <a href="">Tops</a>
            </li>
            <li onClick={closeMenuBar}>
              <a href="">Bottoms</a>
            </li>
            <li onClick={closeMenuBar}>
              <a href="/view/news.html">News</a>
            </li>
            <li onClick={closeMenuBar}>
              <a href="/view/feedback.html">Feed Back</a>
            </li>
            <li onClick={closeMenuBar}>
              <a href="">Sale</a>
            </li>
            <li onClick={closeMenuBar}>
              <a href="">Pre order</a>
            </li>
          </ul>
        </div>
        <div className="funtion">
          <ul className="funtion-list">
            <li onClick={toggle}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </li>
            <li>
              <a href="./profiledetail.html">
              <FontAwesomeIcon icon={faUser} />
              </a>
            </li>
            <li className="heart">
              <a href="./cartproduct.html">
              <FontAwesomeIcon icon={faHeart} />
                <span className="heart-number">0</span>
              </a>
            </li>
            <li className="cart">
              <Link to={"/cart"}>
              <FontAwesomeIcon icon={faCartShopping} />
                <span className="cart-number">0</span>
              </Link>
            </li>
            <li className="menu-bars" onClick={showMenu}>
              <FontAwesomeIcon icon={faBars} />
            </li>
          </ul>
        </div>
      </div>
      
    </header>
  );
}

export default Header;
