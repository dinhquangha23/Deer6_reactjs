// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchSide.css";
import useDebounce from "../../util/useDebounce";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import CartResult from "../CartResult/CartResult";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
export default function SearchSide({ toggleshow, isShow }) {
  const [searchValue,setSearchValue] = useState("");
  const keyWordCallRequest = useDebounce(searchValue,3000);
  const [resultSearch,setResultSearch]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    if(keyWordCallRequest){
      setIsLoading(true);
      console.log("call api")
      setTimeout(() => {
        setIsLoading(false)
      }, 5000);
    }
  },[keyWordCallRequest])
  const handelBtnSearch=()=>{
    console.log()
  }
  const handleOnchangeValue=(e)=>{
    setSearchValue(e.target.value)
  }

  return (
    <div className={`search_component ${isShow ? "show" : ""}`}>
      <div className={`fill_backround_search`} onClick={toggleshow}></div>
      <div className="right_search">
        <div className="right_search_container">
          <div className="right_search_header">
            <h2>Search</h2>
            <span className="right_search_header_close" onClick={toggleshow}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className="right_search_formInput">
            <input
              className="search_input"
              type="text"
              spellCheck="false"
              onChange={handleOnchangeValue}
              placeholder="Search for products"
            />
            <button className="button_search_input" onClick={handelBtnSearch}>
              {
                !isLoading?<FontAwesomeIcon icon={faMagnifyingGlass} />:<HashLoader color="#230dea" cssOverride={null} loading size={18} speedMultiplier={0.8}/>
              }
               
              
            </button>
          </div>
          <div className="result_content">
            <CartResult />
            {/* <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult />
            <CartResult /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
