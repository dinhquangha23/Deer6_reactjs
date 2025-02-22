import React, { useEffect, useState } from "react";
import "./Pay.css"
import {fomartMoney,MoneytoInt} from "../../util"
export default function index() {
  
  const [dataPay, setDataPay] = useState([]);
  const [fullName, setFullName]= useState("")
  const [address, setAddress]= useState("")
  const [phoneNumber, setPhoneNumber]= useState("")
  const [idUser,setIdUser]= useState("")
  const [note,setNote]= useState("")
  let ListIdProduct = []
  let estimate_money =0;
    
  useEffect(()=>{
    let userID = localStorage.getItem("userID");
    if(userID){
      console.log("callapi")
      let optionPost = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id_user:userID}),
      }
      let url = `${import.meta.env.VITE_APP_API}get_carts`
      fetch(url,optionPost).then((Responese)=>Responese.json()).then((response)=>{  
          setDataPay(response)
    })
    }else{
      console.log("xu ly loacl")
    }

    
  },[])

  useEffect(()=>{
    let id_user = localStorage.getItem("userID");
    let url=`${import.meta.env.VITE_APP_API}user/${id_user}`;
    fetch(url).then((Response)=>Response.json())
    .then((response)=>{
      // console.log(response)
      setFullName(response[0].fullname)
      setAddress(response[0].address)
      setPhoneNumber(response[0].phonenumber)
      setIdUser(response[0].id)
    })
  },[])

  const handleInputNameChange =(e)=>{
    setFullName(e.target.value)
  }
  const handleInputAddressChange =(e)=>{
    setAddress(e.target.value)
  }
  const handleInputPhoneNumberChange =(e)=>{
    
    setPhoneNumber(e.target.value)
  }
  const handleInputNoteChange =(e)=>{
    setNote(e.target.value)
  }

  console.log("data in payPage", dataPay)
  // console.log("listIDProduct in payPage", ListIdProduct)
  const handleOrderPay =()=>{
    let dataPaymet ={
      id_user : idUser,
      id_product : ListIdProduct,
      note :note,
      status: "Đang chờ xác nhận đơn hàng"
    }

    let url =`${import.meta.env.VITE_APP_API}payment`
    let optionPaymentPost ={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPaymet),
    }
    fetch(url,optionPaymentPost).then((Response)=>Response.json())
    .then((response)=>{
      console.log(response)
    })

    // console.log(dataPaymet)
  }

  return (

    <div className="container_pay">
      <div className="content">
        <h1 className="title">Thanh toán</h1>
        <div className="bill">
          <div className="info_user_order">
            <h3>Thông tin thanh toán</h3>
            <div className="info-input">
              <label htmlFor="">Họ và tên</label>
              <input disabled className="name" type="text" onChange={handleInputNameChange} value={fullName}/>
            </div>
            <div className="info-input">
              <label htmlFor="">Địa chỉ</label>
              <input disabled className="address" type="text" onChange={handleInputAddressChange} value={address}/>
            </div>
            <div className="info-input">
              <label htmlFor="">Số điện thoại</label>
              <input disabled className="phonenumber" type="number" onChange={handleInputPhoneNumberChange} value={phoneNumber}/>
            </div>
            <div className="info-input">
              <label htmlFor="">Ghi chú đơn hàng</label>
              <textarea
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                name=""
                id=""
                cols={20}
                rows={10}
                value={note}
                onChange={handleInputNoteChange}
              />
            </div>
          </div>
          <div className="total_money_cart">
            <h2>Đơn hàng của bạn</h2>
            <table className="table_total_money">
              <tbody>
                <tr>
                  <th>Sản phẩm</th>
                  <td>Tạm Tính</td>
                </tr>

                {
                  dataPay && dataPay.map((value,index)=>{
                    estimate_money+= value.price *value.quantity;
                    ListIdProduct.push(value.id_product)
                  return (<tr key={index}>
                         <th><span className="titel">{value.Title}</span> - <span className="size">{value.size}</span>  x <span className="Quantity">{value.quantity}</span></th>
                         <td>{fomartMoney(value.price * value.quantity)} ₫</td>
                     </tr>)
                  })
                }
                {/* <tr>
                      <th><span className="titel">Áo phông Made extreme 24001</span> - <span className="size">L</span>  x <span className="Quantity">2</span></th>
                      <td>660.000 ₫</td>
                  </tr> */}
                  
                  
                <tr className="estimate">
                  <th>Tạm tính</th>
                  <td>
                    <span>{fomartMoney(estimate_money) } ₫</span> 
                  </td>
                </tr>
                <tr>
                  <th>Giao Hàng(Phí vận chuyển)</th>
                  <td>30.000 ₫</td>
                </tr>
                <tr>
                  <th>Tổng</th>
                  <td className="total_money">
                    {" "}
                    <span>{fomartMoney(estimate_money+=30000)}</span> ₫
                  </td>
                </tr>
                <tr>
                  <th>Thanh toán khi nhận hàng - COD</th>
                  <td />
                </tr>
              </tbody>
            </table>
            <div className="check_out">
              <button className="btn_check_out_2" onClick={handleOrderPay}>Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
