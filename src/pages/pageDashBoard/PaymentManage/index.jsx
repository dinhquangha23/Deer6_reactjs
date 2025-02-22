import { Button, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'

export default function PaymentManage({noti}) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      render: (text) => <a>{text}</a>,
      onCell: () => ({
        style: { width : 260},
      })
    },
    {
      title: 'First Image',
      dataIndex: 'first Image',
      key: 'firstimage',
      render: (text) => <a>{text}</a>,
      onCell: () => ({
        style: { width : 280},
      })
    },
    {
      title: 'Second Image',
      dataIndex: 'secondimage',
      key: 'Password',
      onCell: () => ({
        style: { width : 260},
      })
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      onCell: () => ({
        style: { width : 100},
      })
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>{showModal(record);setDataModal(record);setIsCreate(false)}} >Update</Button>
          <Button type="primary" onClick={()=>{handleDelete(record)}} danger>Delete</Button>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     id: '1',
  //     username: 'dinhha',
  //     fullname: "đinh quang hà",
  //     password: "123123123",
  //     address: 'Thanh Liêm - Hà Nam',
  //     phonenumber:"12367512786"
  //   },
  //   {
  //     id: '2',
  //     username: 'John Brown',
  //     fullname: "đinh quang hà",
  //     password: "672378126",
  //     address: 'Thanh Liêm ',
  //     phonenumber:"12367512786"
  //   },
  //   {
  //     id: '3',
  //     username: 'John ',
  //     fullname: "đinh quang hà",
  //     password: "7861236573",
  //     address: 'Thanh Liêm ',
  //     phonenumber:"12367512786"
  //   },
  // ];



  const [dataUser,setDataUser]= useState([]);
  const [dataModal,setDataModal]= useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false)
  const [flagRender,setFlagrender]= useState(false)
  
  useEffect(()=>{
    let url =`${import.meta.env.VITE_APP_API}user`
    fetch(url).then((Response)=>Response.json())
    .then((response)=>setDataUser(response))
  },[flagRender])
  useEffect(()=>{
    if(isCreate){
      console.log("in are creating")
    }
    console.log("data - modal :",dataModal)
  })
  const handleDelete=(data)=>{
    let url =`${import.meta.env.VITE_APP_API}user/${data.id}`
    let option ={
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    }
    fetch(url,option).then((Response)=>Response.json())
    .then((response)=>{console.log(response);setFlagrender((pre)=>!pre); noti(toast("xóa tài khoản thành công"))})

  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    if(isCreate){
      let url =`${import.meta.env.VITE_APP_API}user`
      let option ={
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataModal),
      };
      fetch(url,option).then((Response)=>Response.json())
      .then((response)=>{console.log(response);setFlagrender((pre)=>!pre); noti(toast("Thêm tài khoản thành công"))})


    }else{
      let url =`${import.meta.env.VITE_APP_API}user`
      let option ={
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataModal),
      };
      fetch(url,option).then((Response)=>Response.json())
      .then((response)=>{console.log(response),setFlagrender((pre)=>!pre)
        noti(toast(response?.error));
      })
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEmailChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,fullname: e.target.value}})
  }
  const handleNameChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,username: e.target.value}})
  }
  const handlePasswordChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,password: e.target.value}})
  }
  const handleAddressChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,address: e.target.value}})
  }
  const handlePhoneNumberChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,phonenumber: e.target.value}})
  }
  return (
    <div className='account_manage'>
      <div className="addRequest">
      <Button type="primary" onClick={()=>{showModal();setDataModal({});setIsCreate(true)}} >Add New Account</Button>
      </div>
      <Table rowKey="id"  columns={columns} dataSource={dataUser} pagination={false} />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <span>Email or FullName</span>
          <input className='modal_input_update' value={dataModal?.fullname||""} spellCheck='false' type="text" placeholder='Email or Fullname' onChange={handleEmailChange} /> </div>
        <div>
          <span>Name</span>
          <input className='modal_input_update' value={dataModal?.username||""} spellCheck='false' type="text" placeholder='Name' onChange={handleNameChange} /> </div>
        <div>
          <span>Password</span>
          <input className='modal_input_update' value={dataModal?.password||""} spellCheck='false' type="text" placeholder='Password' onChange={handlePasswordChange} /> </div>
        <div>
          <span>Address</span>
          <input className='modal_input_update' value={dataModal?.address||""} spellCheck='false' type="text" placeholder='Address' onChange={handleAddressChange} /> </div>
        <div>
          <span>Phone Number</span>
          <input className='modal_input_update' value={dataModal?.phonenumber||""} spellCheck='false' type="text" placeholder='Phone Number' onChange={handlePhoneNumberChange} /> </div>

      </Modal>
    </div>
    
  )
}
