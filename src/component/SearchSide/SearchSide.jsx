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
  const keyWordCallRequest = useDebounce(searchValue,1000);
  const [resultSearch,setResultSearch]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  useEffect(()=>{
    if(keyWordCallRequest){
      setIsLoading(true);
      let url =`${import.meta.env.VITE_APP_API}search?search=${keyWordCallRequest}`;
    fetch(url)
      .then((Response) => Response.json())
      .then((Response) => {
        setIsLoading(false)
        setResultSearch(Response);
        console.log(Response)
      },[keyWordCallRequest]);
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
            {resultSearch.map((product)=>{return<CartResult key={product.Title} data={product} keySerach={keyWordCallRequest}/>})}
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
            <CartResult />
            <CartResult /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
