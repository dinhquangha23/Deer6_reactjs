import React from 'react'
import "./CartResult.css"
export default function CartResult() {
    const keyWord ="qu";
    const getListKeyWord = (key,title)=>{
        let possition= title.toLowerCase().indexOf(key);
        let arrayKeyWord=[];
        if(possition!==-1){
            arrayKeyWord.push(title.slice(0,possition));
            arrayKeyWord.push(title.slice(possition,possition+key.length));
            arrayKeyWord.push(title.slice(possition+key.length));
        }
        arrayKeyWord.push(title)
        
        return arrayKeyWord
    }
    let list=getListKeyWord(keyWord,"Quần cargo camo WHOA034")
    // console.log(list)
  return (
    <div className='result_container'>
        <div className="result_thumnail">
            <img src="https://deer6.vn/wp-content/uploads/2024/10/WHOA034-73-1000x1000.jpg" alt="" />
        </div>
        <div className='result_container_content'>
            <span className='result_content_title'>{list[0]}<span className='height_light'>{list[1]}</span>{list[2]}</span>
            <span className='result_content_price'>590.000 ₫</span>
        </div>
    </div>
  )
}
