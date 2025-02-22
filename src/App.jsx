import "./App.css";
import Header from "./component/Header";
import Container from "./component/Container/container";
import Footer from "./component/Footer/footer";
import {
  AllProduct,
  CartProduct,
  ProductDetail,
  LoginPage,
  PayPage,
  ProfileDetail,
  DashBoard,
  AccountManage,
  ProductManage,
  PaymentManage,
} from "./pages";
import SearchSide from "./component/SearchSide/SearchSide";

import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify/unstyled";
function App() {
  const notify = function(no){no};
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname.includes("/dashboard");
  // console.log("location ", isLoginPage);
  const [showSearch, setShowSearch] = useState(false);
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <>
      {!isLoginPage && <Header toggle={toggleShowSearch} />}
      <Routes>
        {/* <Route path="/" Component={Container}/> // componet không cần thẻ đóng mở mà chỉ cần truyền tên vào là được */}
          {/* start dash board */}
          <Route path="/dashboard" element={<DashBoard/>}>
            <Route path="accountmanage" element={<AccountManage noti={notify}/>}/>
            <Route path="productmanage" element={<ProductManage/>}/>
            <Route path="paymentmanage" element={<PaymentManage/>}/>
          </Route>
          {/* end dash board */}
        <Route path="/login" element={<LoginPage noti={notify} />} />
        <Route path="/profiledetail" element={<ProfileDetail />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/all_products" element={<AllProduct />} />
        <Route path="/product_detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartProduct />} />
        <Route path="/" element={<Container />} />
      </Routes>
      {<SearchSide isShow={showSearch} toggleshow={toggleShowSearch} />}

      {/* {showSearch?<SearchSide isShow={showSearch} toggleshow={toggleShowSearch}/>:<Fragment/>} */}
      {!isLoginPage && <Footer />}







      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
