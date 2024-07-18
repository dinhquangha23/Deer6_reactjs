import React from 'react'
import "./footer.css"
import { faMapLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Footer() {
  return (
    <footer>
  <div className="contact">
    <div className="contact-left">
      <img
        className="logo-contact"
        src="https://deer6.vn/wp-content/uploads/2021/11/logo-black-300x75.png"
        alt=""
      />
      <div className="contact-info">
        <div className="contact-location">
        <FontAwesomeIcon icon={faMapLocationDot} />
          <span> 54 Triều Khúc, Thanh Xuân, Hà Nội</span>
        </div>
        <a
          target="_blank"
          className="contact-info-map"
          href="https://maps.app.goo.gl/EzdUAZyTFQiKxEpN9"
        >
          <span> xem trên bản đồ</span>
        </a>
        <div className="contact-phone">
        <FontAwesomeIcon icon={faPhone} />
          <span>0837.46.71.16</span>
        </div>
        <div className="social">
          <button className="facebook">
            <i className="fa-brands fa-facebook-f" />
          </button>
          <button className="instagram">
            <i className="fa-brands fa-square-instagram" />
          </button>
          <button className="youtube">
            <i className="fa-brands fa-youtube" />
          </button>
        </div>
      </div>
    </div>
    <div className="contact-middle">
      <div className="menu-footer">
        <ul className="list-menu-footer">
          <li className="list-menu-footer-item">Pre Order</li>
          <li className="list-menu-footer-item">Tất cả sản phẩm</li>
          <li className="list-menu-footer-item">Tops</li>
          <li className="list-menu-footer-item">T shirt / Áo Phông</li>
          <li className="list-menu-footer-item">Áo Hoodie</li>
          <li className="list-menu-footer-item">Jacket / Áo Khoác</li>
          <li className="list-menu-footer-item">
            Áo Sweater // Áo len // Áo thun dài tay
          </li>
          <li className="list-menu-footer-item" />
          <li className="list-menu-footer-item">Shirt / Áo Sơ Mi</li>
          <li className="list-menu-footer-item">Bottoms</li>
          <li className="list-menu-footer-item">Quần Shorts</li>
          <li className="list-menu-footer-item">Pants / Quần dài</li>
          <li className="list-menu-footer-item">Quần Jeans</li>
          <li className="list-menu-footer-item">Accessories</li>
          <li className="list-menu-footer-item">Bag / Túi</li>
          <li className="list-menu-footer-item">Hat / Mũ</li>
        </ul>
      </div>
      <div className="menu-function-footer">
        <ul className="list-menu-function">
          <li className="list-menu-function-item">My account</li>
          <li className="list-menu-function-item">Order History</li>
          <li className="list-menu-function-item">Wish List</li>
          <li className="list-menu-function-item">Newsletter</li>
          <li className="list-menu-function-item">Affiliate</li>
          <li className="list-menu-function-item">Returns</li>
        </ul>
      </div>
    </div>
    <div className="contact-right">
      <h3>LỜI CẢM ƠN</h3>
      <p>
        Cảm ơn nhà tuyển dụng đã dành thời gian để trải nghiệm website 
      </p>
    </div>
  </div>
</footer>

  )
}
