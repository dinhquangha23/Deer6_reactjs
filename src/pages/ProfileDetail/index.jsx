import React, { useEffect, useState } from 'react'
import "./profileDetail.css"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
export default function ProfileDetail() {
  const [userName,setUserName]= useState("")
  const [fullName, setFullName]= useState("")
  const [address, setAddress]= useState("")
  const [phoneNumber, setPhoneNumber]= useState("")
  const [idUser,setIdUser]= useState("")
  const handleInputNameChange =(e)=>{
    setFullName(e.target.value)
  }
  const handleInputAddressChange =(e)=>{
    setAddress(e.target.value)
  }
  const handleInputPhoneNumberChange =(e)=>{
    
    setPhoneNumber(e.target.value)
  }
  const handleOnbur = (e)=>{
    setPhoneNumber(parseInt(e.target.value.replace(/^0/, '84')))
  }
  useEffect(()=>{
    if(localStorage.getItem("userID")== null){
      navigate("/login")
    }
  },[])
  const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem("userID");
    navigate("/login")
  }

  useEffect(()=>{
    let id_user = localStorage.getItem("userID");
    let url=`${import.meta.env.VITE_APP_API}user/${id_user}`;
    fetch(url).then((Response)=>Response.json())
    .then((response)=>{
      console.log(response)
      setUserName(response[0].username)
      setFullName(response[0].fullname)
      setAddress(response[0].address)
      setPhoneNumber(response[0].phonenumber)
      setIdUser(response[0].id)
    })
  },[])
  const handleUpdateUser = ()=>{
    let url =`${import.meta.env.VITE_APP_API}user/${idUser}`;
    let dataUpdate ={
      idUser,
      fullName,
      address,
      phoneNumber
    }
    console.log(dataUpdate)
    let optionUpdate ={
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    };
    fetch(url,optionUpdate).then((Response)=>Response.json())
    .then((response)=>{
      console.log(response)
    })
  }
  return (
    <div className="container">
  <div className="redirect">
    <a href="./home.html">
      <span>
        <Link to={"/"}>Trang chủ</Link>
        </span>
    </a>
    <i><FontAwesomeIcon icon={faAngleRight} /></i>
    <a href="">
      <span><Link to={"/profiledetail"}>Thông tin chi tiết</Link></span>
    </a>
  </div>
  <div className="container-title">
    <h1>Thông tin chi tiết</h1>
  </div>
  <div className="container-content">
    <div className="content-input">
      <label htmlFor="username">Tên tài khoản hoặc email</label>
      <input
        type="text"
        id="username"
        spellCheck="false"
        disabled="true"
        placeholder="Tên tài khoản"
        value={userName}
      />
    </div>
    <div className="content-input">
      <label htmlFor="fullname">Họ và tên</label>
      <input
        type="text"
        id="fullname"
        spellCheck="false"
        placeholder="Họ và tên"
        onChange={handleInputNameChange}
        value={fullName}
      />
    </div>
    <div className="content-input">
      <label htmlFor="address">Địa chỉ</label>
      <input
        type="text"
        id="address"
        spellCheck="false"
        placeholder="Địa chỉ"
        onChange={handleInputAddressChange}
        value={address}
      />
    </div>
    <div className="content-input">
      <label htmlFor="phonenumber">Số điện thoại</label>
      <input
        type="number"
        size={10}
        id="phonenumber"
        spellCheck="false"
        placeholder="Số điện thoại"
        onChange={handleInputPhoneNumberChange}
        value={phoneNumber}
        onBlur={handleOnbur}
      />
    </div>
    <button type="button" onClick={handleUpdateUser}>Cập nhập</button>
    <button type="button" style={{marginLeft : 20}} onClick={handleLogout}>Đăng Xuất</button>
  </div>
</div>

  )
}
