import { useParams,useNavigate, json } from "react-router-dom";
import "./ProductDetail.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { fomartMoney, MoneytoInt } from "../../util";
function productDetail() {
  const param = useParams();
  const [data, setData] = useState("");
  const [active, setActive] = useState(1);
  const [size, setSize] = useState("M");
  const [activeSize, setActiveSize] = useState(1);
  const [activeColor, SetActiveColor] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const inputQuantityRef = useRef();
  const [dataReceipt, setDataReciept] = useState({
    id : "",
    id_user :"",
    Title: "",
    color: "while",
    size: "M",
    quantity: 1,
    price: "",
    thumbnail: "",
  });
  const navigator = useNavigate();

  // console.log(data)
  useEffect(() => {
    console.log("hello")
    let url = `${import.meta.env.VITE_APP_API}product/${param.id}`;
    fetch(url)
      .then((Response) => Response.json())
      .then((Response) => {
        const [response]=Response;
        setData(response);
        console.log("data luc dau",response)
        setDataReciept((pre) => {
          return {
            ...pre,
            id_product: param.id,
            Title: response.Title,
            thumbnail: response.secondimage,
            price: fomartMoney(response.price),
          };
        });
      });
      window.scrollTo(0,0);
  }, [param.id]);



  let handleSize = (e, index) => {
    // setSize(e.target.textContent)
    setActiveSize(index);
    setDataReciept({ ...dataReceipt, size: e.target.textContent });
  };

  let handleChangeQuantity = (e) => {
    if (e.target.value == "") {
      setQuantity(1);
    }
    setQuantity(e.target.value && parseInt(e.target.value));
    setDataReciept({
      ...dataReceipt,
      quantity: e.target.value && parseInt(e.target.value),
    });
    console.log("ham set quantity");
  };

  let handleMinus = () => {
    if (inputQuantityRef.current.value == "") {
      setQuantity(1);
    }
    if (quantity > inputQuantityRef.current.min) {
      setQuantity((pre) => pre - 1);
      setDataReciept({ ...dataReceipt, quantity: dataReceipt.quantity - 1 });
    }
  };

  let handlePlus = () => {
    if (inputQuantityRef.current.value == "") {
      setQuantity(1);
    }
    else if (quantity < inputQuantityRef.current.max) {
      setQuantity((pre) => pre + 1);
      setDataReciept({
        ...dataReceipt,
        quantity: parseInt(dataReceipt.quantity) + 1,
      });
    }
  };

  let handleBlur = (e) => {
    if (
      e.target.value == "" ||
      parseInt(e.target.value) > parseInt(e.target.max) ||
      parseInt(e.target.value) < parseInt(e.target.min)
    ) {
      setQuantity(1);
      setDataReciept({ ...dataReceipt, quantity: parseInt(1) });
    }
  };

  let handeleColorChange = (e) => {
    console.log(e.target.getAttribute("data-color"));
    setDataReciept({
      ...dataReceipt,
      color: e.target.getAttribute("data-color"),
    });
  };

  let handelAddCart = () => {
    if (dataReceipt.quantity != 0) {
      
      let url = "http://localhost:3000/api/carts";
      let flagUpdate=false;
      let flagMap = true;
      if(localStorage.getItem("userID")==undefined){
        const dataLocal = JSON.parse(localStorage.getItem("cart"))
        if(dataLocal==undefined || dataLocal.length==0){
          dataReceipt["id_local"]= uuidv4();
          localStorage.setItem("cart",JSON.stringify([dataReceipt]))}
        else{
          dataLocal.map((value)=>{
            if(value.id_product == dataReceipt.id_product && value.color === dataReceipt.color && value.size === dataReceipt.size){
              value.quantity+= dataReceipt.quantity
              localStorage.setItem("cart",JSON.stringify(dataLocal))
              flagMap=false
            }else{
              flagUpdate=true
            }
          })
          if(flagUpdate&&flagMap){
            flagUpdate=false
            flagMap=true
            console.log("data_recept_in_local", dataReceipt)
            dataReceipt["id_local"]= uuidv4();
            dataLocal.push(dataReceipt)
          localStorage.setItem("cart",JSON.stringify(dataLocal))
          }
          

        }
        
        // console.log("localstorage co :",JSON.parse(dataLocal))
      }else{
        
        setDataReciept((pre) => {
          return {
            ...pre,
            id_user: localStorage.getItem("userID")
          };
        });
        dataReceipt.id_user=localStorage.getItem("userID");
        let option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataReceipt),
        };
        fetch(url, option)
        .then((Response) => {
          Response.json();
        })
        .then((Response) => {
        //  navigator('/all_products')

        });
      }
      
      
    }
  };


  useEffect(()=>{console.log("dữ liệu data recipt",dataReceipt)})
  // console.log(dataReceipt);
  return (
    <div className="container">
      <div className="container_wrap">
        {/* {console.log(size)} */}
        <div className="main-image">
          <div className="thumbnail-left">
            <ul className="list-thumbnail-left">
              <li
                className={`list-thumbnail-left-item ${
                  active == 1 ? "active1" : ""
                }`}
                onClick={() => {
                  setActive(1);
                }}
              >
                <img
                  src={
                    data.firstimage
                      ? data.firstimage
                      : "https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/white/Photoroom_white_background_extremely_fine_texture_only_white_co_d6a2d66a-dfe4-41fc-80fd-ec55764101bb.jpg"
                  }
                  alt=""
                />
              </li>
              <li
                className={`list-thumbnail-left-item ${
                  active == 2 ? "active1" : ""
                }`}
                onClick={() => {
                  setActive(2);
                }}
              >
                <img
                  src={
                    data.secondimage
                      ? data.secondimage
                      : "https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/white/Photoroom_white_background_extremely_fine_texture_only_white_co_d6a2d66a-dfe4-41fc-80fd-ec55764101bb.jpg"
                  }
                  alt=""
                />
              </li>
            </ul>
          </div>
          <div className="image-center">
            <div
              className={`image-viewport-item ${active == 1 ? "active" : ""}`}
            >
              <img
                className="image-viewport-item-img"
                src={
                  data.firstimage
                    ? data.firstimage
                    : "https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/white/Photoroom_white_background_extremely_fine_texture_only_white_co_d6a2d66a-dfe4-41fc-80fd-ec55764101bb.jpg"
                }
                alt=""
              />
            </div>
            <div
              className={`image-viewport-item ${active == 2 ? "active" : ""}`}
            >
              <img
                className="image-viewport-item-img"
                src={
                  data.secondimage
                    ? data.secondimage
                    : "https://cdn.photoroom.com/v1/assets-cached.jpg?path=backgrounds_v3/white/Photoroom_white_background_extremely_fine_texture_only_white_co_d6a2d66a-dfe4-41fc-80fd-ec55764101bb.jpg"
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="info-detail">
          <div className="info-detail-title">
            <h1>{"LOADING..." && data.Title}</h1>
            <span />
            <span>{fomartMoney(data.price)}₫</span>
          </div>
          <div className="info-detail-option">
            <span>color</span>
            <ul className="option-color">
              <li
                className="option-color-item"
                onClick={() => {
                  SetActiveColor(1);
                }}
              >
                <button
                  className={`while ${activeColor == 1 ? "active" : ""}`}
                  data-color="while"
                  onClick={handeleColorChange}
                />
              </li>
              <li
                className="option-color-item"
                onClick={() => {
                  SetActiveColor(2);
                }}
              >
                <button
                  className={`black ${activeColor == 2 ? "active" : ""}`}
                  data-color="black"
                  onClick={handeleColorChange}
                />
              </li>
            </ul>
            <span>Size</span>
            <ul className="option-size">
              <li className="option-size-item">
                <button
                  className={`${activeSize == 1 ? "active" : ""}`}
                  onClick={(e, index) => handleSize(e, 1)}
                >
                  M
                </button>
              </li>
              <li className="option-size-item">
                <button
                  className={`${activeSize == 2 ? "active" : ""}`}
                  onClick={(e, index) => handleSize(e, 2)}
                >
                  L
                </button>
              </li>
              <li className="option-size-item">
                <button
                  className={`${activeSize == 3 ? "active" : ""}`}
                  onClick={(e, index) => handleSize(e, 3)}
                >
                  XL
                </button>
              </li>
            </ul>
          </div>
          <div className="info-detail-function">
            <div className="input-quantity">
              <input
                type="button"
                defaultValue="-"
                className="minus"
                onClick={handleMinus}
              />
              <input
                className="inputnumber"
                type="number"
                value={quantity}
                onChange={(e) => handleChangeQuantity(e)}
                step={1}
                size={2}
                max={10}
                min={1}
                ref={inputQuantityRef}
                onBlur={(e) => handleBlur(e)}
              />
              <input
                type="button"
                defaultValue="+"
                className="plus"
                onClick={handlePlus}
              />
            </div>
            <div className="add-cart">
              <button className="btn-add-cart" onClick={handelAddCart}>
                <i className="fa-solid fa-cart-shopping" />
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
          <div className="buy">
            <button className="buy-now">Buy it now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default productDetail;
