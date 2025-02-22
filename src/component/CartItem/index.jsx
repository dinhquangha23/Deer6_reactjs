import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.css"
import {MoneytoInt,fomartMoney} from "../../util"
// import { memo } from "react";
function CartItem({cartData, setFlagRerenderWhenUpdateQuantity}) {
    let [dataCart,SetDataCart] = useState({...cartData})
    let [valueInput,setValueInput]= useState(parseInt(dataCart.quantity)||0);
    let [flag,setFlag]= useState(true)
    const inputValueRef= useRef();
    console.log({dataCart})
    
    
    
    useEffect(()=>{
      
        let timerid = setTimeout(()=>{
          if(localStorage.getItem("userID")== undefined){
           let dataLocal = JSON.parse(localStorage.getItem("cart"));
           dataLocal.map((item)=>{
            if(parseInt(item.id_local)==parseInt(dataCart.id_local)){
              item.quantity = valueInput
            }
            localStorage.setItem("cart",JSON.stringify(dataLocal))
            
           })
           setFlagRerenderWhenUpdateQuantity((pre)=>!pre)
          }else{
            let url = `${import.meta.env.VITE_APP_API}carts/${dataCart.id_product}`
          console.log("chay ne",cartData)
          let data = {...dataCart,quantity:valueInput}
          console.log("data update cart :",data)
          let optionUpdate = {
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(data)
          }
          fetch(url,optionUpdate).then((Response)=>Response.json())
          .then((Response)=>{console.log("data mwoi",Response);
            
              setFlagRerenderWhenUpdateQuantity((pre)=>!pre)
          
            
          })
          }
          
    
          },340)

          return ()=>{
           
            clearTimeout(timerid)
          }
  
    },[valueInput,flag])
    // console.log(cartData)
    let handleInputQuantity =(e)=>{
      setFlagRerenderWhenUpdateQuantity((pre)=>{
        return !pre
      })
        if(e.target.value !="")
        setValueInput(e.target.value)
        else if(e.target.value ==""){
            setValueInput(1)
        }

    }
    let handleBlur = (e) => {
      
        if (
          e.target.value == "" ||
          parseInt(e.target.value) > parseInt(e.target.max) ||
          parseInt(e.target.value) < parseInt(e.target.min)
        ) {
          setValueInput(1);
        }
      };
      let handleMinus = () => {
        
        if (inputValueRef.current.value == "") {
            setValueInput(1);    
        }
        if (valueInput > inputValueRef.current.min) {
          setValueInput((pre) => pre - 1);
        }
      };
    
      let handlePlus = () => {
        
        if (inputValueRef.current.value == "") {
            setValueInput(1);   
        }
        if (parseInt(valueInput) < inputValueRef.current.max) {
            setValueInput((pre) => pre + 1);
        }
      };


      const handleDelete = ()=>{
        if(localStorage.getItem("userID")== undefined){
          console.log(dataCart.id_local)
          const dataLocal = JSON.parse(localStorage.getItem("cart"))
          const newDataLocal = dataLocal.filter((item)=>{
            if(item.id_local!=dataCart.id_local){
              return true
            }
          })
          // console.log("data của local mới",dataLocal)
          // console.log("data của local mới",newDataLocal)
          localStorage.setItem("cart",JSON.stringify(newDataLocal))
          setFlagRerenderWhenUpdateQuantity((pr)=>{return !pr})
        }else{
          let url =`${import.meta.env.VITE_APP_API}carts`
          let optionDelete = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({id: dataCart.id,color: dataCart.color,size: dataCart.size})
          }
          fetch(url,optionDelete).then((Response)=>Response.json())
          .then((response)=>{
              if(response.rowUpdate>=1){
                setFlagRerenderWhenUpdateQuantity((pre)=>!pre)
              }
            }
          )
          
        }
        
      }
    return (
    <tr>
        <td> <button onClick={handleDelete} className="close"><FontAwesomeIcon icon={faXmark} /></button></td>
        <td><img src={dataCart.thumbnail} alt=""/></td>
        <td>{`${dataCart.Title} - ${dataCart.size}`}</td>
        <td>{`${dataCart.price&&fomartMoney(dataCart.price)} ₫`}</td>
        <td>
            <div className="input-quantity">
                <input type="button" value="-" className="minus" onClick={handleMinus}/>
                <input className="inputnumber" type="number" value={valueInput} onChange={handleInputQuantity} step={1} size={2} max={10} min={1} ref={inputValueRef} onBlur={handleBlur}/>
                <input type="button" value="+" className="plus" onClick={handlePlus}/>
            </div>

        </td>
        <td>{fomartMoney(MoneytoInt(String(dataCart.price))*valueInput)} ₫</td>
    </tr>
  );
}
export default CartItem;
