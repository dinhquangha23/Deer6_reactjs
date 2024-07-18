import "./App.css";
import Header from "./component/Header";
import Container from "./component/Container/container";
import Footer from "./component/Footer/footer";
import {AllProduct, ProductDetail} from "./pages"


import {Route,Routes} from "react-router-dom"
function App() {
  return (
    <>
      <Header />
      
      <Routes>
        {/* <Route path="/" Component={Container}/> // componet không cần thẻ đóng mở mà chỉ cần truyền tên vào là được */} 
        <Route path="/" element={<Container/>}/>
        <Route path="/all_products" element={<AllProduct/>}/>
        <Route path="/product_detail/:id" element={<ProductDetail/>}/>
      </Routes>
      
      <Footer/>
    </>
  );
}

export default App;
