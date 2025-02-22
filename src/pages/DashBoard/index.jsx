import React, { useState } from 'react'
import "./DashBoard.css"
import { BankFilled, HomeFilled, LockFilled, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';


export default function DashBoard() {
    const navigate =useNavigate()
    const items = [
        {
          key: '1',
          icon: <UserOutlined />,
          label: 'Account Manager',
          onClick: ()=>{ navigate("accountmanage")}
        },
        {
          key: '2',
          icon: <ShoppingCartOutlined />,
          label: 'Product Manager',
          onClick: ()=>{ navigate("productmanage")}
        },
        {
          key: '3',
          icon: <BankFilled />,
          label: 'Payment manager',
          onClick: ()=>{ navigate("paymentmanage")}
        },{
          key: '4',
          icon: <SettingOutlined />,
          label: 'Option',
          children: [
            {
              key: '31',
              label: 'Home',
              icon:<HomeFilled />,
              onClick : ()=>{ navigate("/")}
            },
            {
              key: '32',
              label: 'Logout Admin',
              icon : <LockFilled />,
              onClick : ()=>{localStorage.removeItem("userID");
                navigate("/login")}
            }
          ],
        }
      ];
      const getLevelKeys = (items1) => {
        const key = {};
        const func = (items2, level = 1) => {
          items2.forEach((item) => {
            if (item.key) {
              key[item.key] = level;
            }
            if (item.children) {
              func(item.children, level + 1);
            }
          });
        };
        func(items1);
        return key;
      };
      const levelKeys = getLevelKeys(items);
    
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
    return (
    <div className='DashBoard'>
        <div className='Left_Navbar'>
            
            <div className='header_left_nav'>
            <img src="https://deer6.vn/wp-content/uploads/2024/10/Untitled-2.png" alt="" />
            <span>ADMIN</span>
            </div>
        <Menu
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            style={{
                width: 256,
                flex:1
                    }}
            items={items}
        />
        </div>
        <div className='dashboard_container'>
            <Outlet></Outlet>
        </div>
    </div>
  )
}
