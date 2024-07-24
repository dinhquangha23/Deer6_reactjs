import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.css"
import {MoneytoInt,fomartMoney} from "../../util"
import { memo } from "react";
function CartItem({cartData, setFlagRerenderWhenUpdateQuantity}) {
    let [valueInput,setValueInput]= useState(parseInt(cartData.quantity)||0);
    let [dataCart,SetDataCart] = useState(cartData)
    let mount = useRef(false)
    const inputValueRef= useRef();
    console.log({dataCart})
    useEffect(()=>{
      if(mount.current){
        let timerid = setTimeout(()=>{
          // let url = `${import.meta.env.VITE_APP_API}carts/${cartData.id}`
           let url = `http://localhost:3000/carts/${cartData.id}`
          console.log("chay ne")
          let data = {...dataCart,quantity:valueInput}
          console.log("data update cart :",data)
          let optionUpdate = {
            method: "PUT",
            header:{"Content-Type":"application/json"},
            body: JSON.stringify(data)
          }
          fetch(url,optionUpdate).then((Response)=>Response.json())
          .then((Response)=>{console.log("data mwoi",Response);
            if(mount.current){
              setFlagRerenderWhenUpdateQuantity((pre)=>!pre)
            }
            
          })
    
          },300)

          return ()=>{
            clearTimeout(timerid)
          }
      }else{
        mount.current=true;
      }
      
      
    

    },[valueInput])
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
    return (
    <tr>
        <td> <button className="close"><FontAwesomeIcon icon={faXmark} /></button></td>
        <td><img src={cartData.thumbnail} alt=""/></td>
        <td>{`${cartData.title} - ${cartData.size}`}</td>
        <td>{`${cartData.price&&fomartMoney(cartData.price)} ₫`}</td>
        <td>
            <div className="input-quantity">
                <input type="button" value="-" className="minus" onClick={handleMinus}/>
                <input className="inputnumber" type="number" value={valueInput} onChange={handleInputQuantity} step={1} size={2} max={10} min={1} ref={inputValueRef} onBlur={handleBlur}/>
                <input type="button" value="+" className="plus" onClick={handlePlus}/>
            </div>

        </td>
        <td>{fomartMoney(cartData.price*valueInput)} ₫</td>
    </tr>
  );
}
export default memo(CartItem);
