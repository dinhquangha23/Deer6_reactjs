import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping,faMagnifyingGlass,faUser,faHeart} from'@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
function Header({toggle}) {

  return (
    <header>
      <div className="content">
        <div className="logo">
          <img
            src="https://deer6.vn/wp-content/uploads/2021/11/logo-black.png"
            alt=""
          />
        </div>
        <div className="menubar">
          <ul className="main-menu">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/all_products"}>All Products</Link>
            </li>
            <li>
              <a href="">Tops</a>
            </li>
            <li>
              <a href="">Bottoms</a>
            </li>
            <li>
              <a href="/view/news.html">News</a>
            </li>
            <li>
              <a href="/view/feedback.html">Feed Back</a>
            </li>
            <li>
              <a href="">Sale</a>
            </li>
            <li>
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
          </ul>
        </div>
      </div>
      
    </header>
  );
}

export default Header;
