import React, { useEffect, useState } from 'react'
import { Button, Flex, Modal, Select, Space, Table } from 'antd';
import { toast } from 'react-toastify';

export default function Productmanage({noti}) {
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
      dataIndex: 'firstimage',
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


  const [dataProduct,setDataProduct]= useState([]);
  const [dataModal,setDataModal]= useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false)
  const [flagRender,setFlagrender]= useState(false)
  const [categoryValue,setCategoryValue]= useState([])
  // const [selectedValue,setSelectValue]= useState(2)
  
  useEffect(()=>{
    let url =`${import.meta.env.VITE_APP_API}product`
    fetch(url).then((Response)=>Response.json())
    .then((response)=>setDataProduct(response))
  },[flagRender])
  useEffect(()=>{
    let url =`${import.meta.env.VITE_APP_API}category`
    fetch(url).then((Response)=>Response.json())
    .then((response)=>setCategoryValue(response))
  },[])
  useEffect(()=>{
    if(isCreate){
      console.log("in are creating")
    }
    console.log("data - modal :",dataModal)
  })
  const handleDelete=(data)=>{
    let url =`${import.meta.env.VITE_APP_API}product/${data.id}`
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
      let url =`${import.meta.env.VITE_APP_API}product`
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
      let url =`${import.meta.env.VITE_APP_API}product`
      let option ={
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataModal),
      };
      fetch(url,option).then((Response)=>Response.json())
      .then((response)=>{console.log(response),setFlagrender((pre)=>!pre)
        noti(toast("update succesfully"));
      })
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDataModal({})
  };
  const handleTitleChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,Title: e.target.value}})
  }
  const handleFirstImageChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,firstimage: e.target.value}})
  }
  const handleSecondImageChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,secondimage: e.target.value}})
  }
  const handlePriceChange =(e)=>{
    setDataModal((pre)=>{ return{...pre,price: e.target.value}})
  }
  const handleSelectCategoryChange = (value) => {
    setDataModal((pre)=>{ return{...pre,category_id: value,
    }},console.log("value categorychange",value))
  };
  return (
    <div className='account_manage'>
      <div className="addRequest">
      <Button type="primary" onClick={()=>{showModal();setDataModal({});setIsCreate(true)}} >Add New Product</Button>
      </div>
      <Table rowKey="id"  columns={columns} dataSource={dataProduct} pagination={false} />
      <Modal title="THÊM SẢN PHẦM" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <span>Title</span>
          <input className='modal_input_update' value={dataModal?.Title||""} spellCheck='false' type="text" placeholder='Title Product' onChange={handleTitleChange} /> </div>
        <div>
          <span>First Image</span>
          <input className='modal_input_update' value={dataModal?.firstimage||""} spellCheck='false' type="text" placeholder='First Image' onChange={handleFirstImageChange} /> </div>
        <div>
          <span>Second Image</span>
          <input className='modal_input_update' value={dataModal?.secondimage||""} spellCheck='false' type="text" placeholder='Second Image' onChange={handleSecondImageChange} /> </div>
        <div>
          <span>Price</span>
          <input className='modal_input_update' value={dataModal?.price||""} spellCheck='false' type="number" placeholder='Price' onChange={handlePriceChange} /> </div>
        <div className='categoryOption'>
          <span>Category</span>
          <Select 
      value={dataModal.category_id} 
      onChange={handleSelectCategoryChange} 
      style={{ width: 200 }}
      placeholder="Select Category Name"
    >
      {categoryValue.map((value)=>
           <Select.Option key={value.id} value={value.id}>{value.categoryname}</Select.Option>
      )}
    </Select> </div>
      
      </Modal>
    </div>
    
  )
}
