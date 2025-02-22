import React, { useRef, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function LoginPage({ noti }) {
  const container_login = useRef();
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [emailRegist, setEmailRegist] = useState("");
  const [passwordRegist, setPasswordRegist] = useState("");
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const handleSingUpButton = () => {
    container_login.current.classList.add("right-panel-active");
  };
  const handleSingInButton = () => {
    container_login.current.classList.remove("right-panel-active");
  };

  // handel change value in loginm and regist
  const handleEmailChange = (even) => {
    setEmailLogin(even.target.value);
  };
  const handlePasswordChange = (even) => {
    setPasswordLogin(even.target.value);
  };
  const handleEmail_RegistChange = (even) => {
    setEmailRegist(even.target.value);
  };
  const handlePassword_RegistChange = (even) => {
    setPasswordRegist(even.target.value);
  };
  const handleNameChange = (even) => {
    setName(even.target.value);
  };

  const handlelLogin = (e) => {
    e.preventDefault();
    const dataLogin = {
      Email: emailLogin,
      Password: passwordLogin,
    };
    let optionLogin = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    };
    let url = `${import.meta.env.VITE_APP_API}login`;
    fetch(url, optionLogin)
      .then((Response) => Response.json())
      .then((response) => {
        localStorage.setItem("userID", response.userID)
        noti(toast[response.type](response.content));
        setTimeout(() => {
          navigate("/")
        }, 2000);
      });
    // noti(toast["error"]("Wow so easy!"))
  };
  const handlelRegist = (e) => {
    e.preventDefault();
    // noti(toast["error"]("Wow so easy!"));

    const dataRegist = {
      Email: emailRegist,
      Password: passwordRegist,
      Name:Name
    };
    let optionRegist = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRegist),
    };
    let url = `${import.meta.env.VITE_APP_API}register`;
    fetch(url, optionRegist)
      .then((Response) => Response.json())
      .then((response) => {
        noti(toast[response.type](response.content));
      });

  };
  return (
    <>
      <div ref={container_login} className="container_login" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Tạo tài khoản</h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div> */}
            <span>or use your email for registration</span>
            <input
              className="Name"
              type="text"
              placeholder="Name"
              onChange={handleNameChange}
              value={Name}
            />
            <input
              className="Email"
              type="email"
              placeholder="Email"
              onChange={handleEmail_RegistChange}
              value={emailRegist}
            />
            <input
              className="PassWord"
              type="password"
              placeholder="Password"
              onChange={handlePassword_RegistChange}
              value={passwordRegist}
            />
            <button className="button" onClick={handlelRegist}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Đăng nhập</h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div> */}
            <span style={{marginBottom:26}}></span>
            <span>Email or use your account</span>
            <input
              className="Email"
              type="email"
              placeholder="Email hoặc tên đăng nhập"
              onChange={handleEmailChange}
              value={emailLogin}
            />
            <input
              className="PassWord"
              type="password"
              placeholder="Mật khẩu"
              onChange={handlePasswordChange}
              value={passwordLogin}
            />
            <span style={{marginBottom:26}}></span>
            {/* <a href="#">Bạn quên mật khẩu?</a> */}
            <button className="button" onClick={handlelLogin}>
              Đăng nhập
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={handleSingInButton}
                className=" button ghost"
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Chào bạn!</h1>
              <p>
                Vui lòng đăng ký để trải nghiệm được hiệu quả hơn
              </p>
              <button
                onClick={handleSingUpButton}
                className=" button ghost"
                id="signUp"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
