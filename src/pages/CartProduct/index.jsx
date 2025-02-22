import React, { useEffect, useRef, useState } from 'react'
import "./CartProduct.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import CartItem from '../../component/CartItem'
import {fomartMoney,MoneytoInt} from "../../util"
import { useNavigate } from 'react-router-dom'

function CartProduct() {
  let [data,setData]=useState([])
  let [estimate,setEstimate]=useState(0)
  let [flagRerenderWhenUpdateQuantity,setFlagRerenderWhenUpdateQuantity] = useState(true)
  let calculateEstimate= (array,initValue)=>{
    let result= array.reduce((es,cur)=>{
      return es + (MoneytoInt(String(cur.price)) *cur.quantity)
    },initValue)
    return result
  }
    let navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("userID")==undefined){
        console.log("khoong co id user de lay cart nen lay trong localstorage")
        let dataLocalStorage = JSON.parse(localStorage.getItem("cart"))
        console.log("datalocal",dataLocalStorage)
        setData(dataLocalStorage)
     setEstimate(calculateEstimate(dataLocalStorage,0))
    }else{
      let url =`${import.meta.env.VITE_APP_API}get_carts`
      let optionFetch ={
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id_user: localStorage.getItem("userID")}),
      };
    fetch(url,optionFetch).then((Response)=>Response.json())
    .then(Response=>{
      console.log("đinh quang hà",Response)
      setData(Response)
     setEstimate(calculateEstimate(Response,0))
    })
    }


    
  },[flagRerenderWhenUpdateQuantity])

  // useEffect(()=>{
  //   console.log("haha ",data)
  //   setEstimate(calculateEstimate(data,0))

  // },[flagRerenderWhenUpdateQuantity])
  const handlePay = ()=>{
    navigate("/pay")
  }

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
            {data&&data.map((item ,index)=>{
              return item &&<CartItem key={item.id} cartData={item} setFlagRerenderWhenUpdateQuantity={setFlagRerenderWhenUpdateQuantity}/>
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
            
                <span style={{fontSize: 15}}>{data? fomartMoney(estimate) :0 } ₫</span> 
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
                <span style={{fontSize: 15}}>{data? fomartMoney(estimate+30000): 0}</span> ₫
              </td>
            </tr>
          </tbody>
        </table>
        <div className="check_out">
          <button className="btn_check_out" onClick={handlePay}>Tiến hành Thanh toán</button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default CartProduct