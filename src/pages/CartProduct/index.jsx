import React, { useEffect, useState } from 'react'
import "./CartProduct.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import CartItem from '../../component/CartItem'
import {fomartMoney,MoneytoInt} from "../../util"

function CartProduct() {
  let [data,setData]=useState([])
  let [estimate,setEstimate]=useState(0)
  let [flagRerenderWhenUpdateQuantity,setFlagRerenderWhenUpdateQuantity] = useState(true)
  let calculateEstimate= (array,initValue)=>{
    let result= array.reduce((es,cur)=>{
      return es + (cur.price *cur.quantity)
    },initValue)
    return result
  }
  useEffect(()=>{
    let url ="http://localhost:3000/carts"
    fetch(url).then((Response)=>Response.json())
    .then(Response=>{setData(Response)
     setEstimate(calculateEstimate(Response,0))
    })
  },[flagRerenderWhenUpdateQuantity])

  
  useEffect(()=>{
    console.log("haha",data)
    setEstimate(calculateEstimate(data,0))

  },[flagRerenderWhenUpdateQuantity])

  return (
    <div className="container">
  <div className="content">
    <h1 className="title">Giỏ hàng</h1>
    <div className="bill">
      <table className="table-bill">
        <tbody>
          <tr>
            <th className="col-remove" />
            <th className="col-thumbnail" />
            <th className="col-product">Sản Phẩm</th>
            <th className="col-price">Giá</th>
            <th className="col-quantity">Số Lượng</th>
            <th className="col-estimate">Tạm Tính</th>
          </tr>
          {/* bắt đầu item cart */}
            {data.map((item ,index)=>{
              return <CartItem key={index} cartData={item} setFlagRerenderWhenUpdateQuantity={setFlagRerenderWhenUpdateQuantity}/>
            })}
              
          {/* kết thúc item cart */}
        </tbody>
      </table>
      <div className="total_money_cart">
        <h2>Cộng giỏ hàng</h2>
        <table className="table_total_money">
          <tbody>
            <tr>
              <th>Tạm tính</th>
              <td className="estimate_total_money">
            
                <span>{data? fomartMoney(estimate) :0 } ₫</span> 
              </td>
            </tr>
            <tr>
              <th>Giao hàng</th>
              <td className="transport">
                <ul className="info_transport">
                  <li className="info_transport_item">
                    Phí vận chuyển: 30.000 ₫
                  </li>
                  <li className="info_transport_item">Vận chuyển đến CA.</li>
                  <li className="info_transport_item">
                    Giao hàng hỏa tốc <i className="fa-solid fa-truck-fast" />
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>Tổng</th>
              <td className="total_money">
                
                <span>{data? fomartMoney(estimate+30000): 0}</span> ₫
              </td>
            </tr>
          </tbody>
        </table>
        <div className="check_out">
          <button className="btn_check_out">Tiến hành Thanh toán</button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default CartProduct