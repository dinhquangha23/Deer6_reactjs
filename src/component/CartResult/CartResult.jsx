// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./CartResult.css"
import { fomartMoney } from '../../util';

export default function CartResult({data,keySerach}) {
    const keyWord =keySerach;
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
  return (
    <div className='result_container'>
        <div className="result_thumnail">
            <img src={data.firstimage} alt="" />
        </div>
        <div className='result_container_content'>
            <span className='result_content_title'>{list[0]}<span className='height_light'>{list[1]}</span>{list[2]}</span>
            , react/prop-types
            <span className='result_content_price'>{fomartMoney(data?.price)} ₫</span>
        </div>
    </div>
  )
}
