// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./CartResult.css"
import { fomartMoney } from '../../util';
import { Link, useNavigate } from 'react-router-dom';

export default function CartResult({data,keySerach}) {
    const keyWord =keySerach;
    const navigate = useNavigate();
    const handelNavigate = ()=>{
        navigate(`/product_detail/${data?.id}`)
    }
    const getListKeyWord = (key,title)=>{
        let possition= title.toLowerCase().indexOf(key.toLowerCase());
        console.log("possition :",possition)
        let arrayKeyWord=[];
        if(possition!==-1){
            arrayKeyWord.push(title.slice(0,possition));
            arrayKeyWord.push(title.slice(possition,possition+key.length));
            arrayKeyWord.push(title.slice(possition+key.length));
        }
        arrayKeyWord.push(title)
        return arrayKeyWord
    }
    
    let list=getListKeyWord(keyWord,data.Title)
    // console.log(list)
    console.log("dataSearcg",data)
  return (
    <div onClick={handelNavigate} className='result_container'>
        <div className="result_thumnail">
            <img src={data.firstimage} alt="" />
            
        </div>
        <div className='result_container_content'>
            <span className='result_content_title'>{list[0]}<span className='height_light'>{list[1]}</span>{list[2]}</span>
            <span className='result_content_price'>{fomartMoney(data?.price)} ₫</span>
        </div>
    </div>
  )
}
