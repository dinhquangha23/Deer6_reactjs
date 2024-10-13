import "./App.css";
import Header from "./component/Header";
import Container from "./component/Container/container";
import Footer from "./component/Footer/footer";
import {AllProduct, CartProduct, ProductDetail} from "./pages"
import SearchSide from "./component/SearchSide/SearchSide";

import {Route,Routes} from "react-router-dom"
import {useState } from "react";
function App() {
    const [showSearch,setShowSearch]=useState(false)
    const toggleShowSearch=()=>{
      setShowSearch(!showSearch)
    }
  return (
    <>
      <Header toggle={toggleShowSearch} />
      
      <Routes>
        {/* <Route path="/" Component={Container}/> // componet không cần thẻ đóng mở mà chỉ cần truyền tên vào là được */} 
        
        <Route path="/all_products" element={<AllProduct/>}/>
        <Route path="/product_detail/:id" element={<ProductDetail/>}/>
        <Route path="/cart" element={<CartProduct/>} />
        <Route path="/" element={<Container/>}/>
      </Routes>
      {/* {showSearch?<SearchSide isShow={showSearch} toggleshow={toggleShowSearch}/>:<Fragment/>} */}
      {<SearchSide isShow={showSearch} toggleshow={toggleShowSearch}/>}
      <Footer/>
    </>
  );
}

export default App;
