import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";
import { FaStar } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdSwitchAccessShortcut } from "react-icons/md";
import axios from "axios";
import { showSucess } from "../Alert/Alert";

export default function detailProduct() {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3300/api/product/${id}`)
        .then((res) => {
          console.log(res.data);
          setDetail(res.data);
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setError("Failed to load products");
          setLoading(false); // Stop loading in case of error
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/3 ">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: detail.product_id,
        name: detail.product_name,
        price: detail.product_unit_price,
        quantity: quantity,
        discount: detail.product_discount,
        img: detail.product_image,
      })
    );
  };

  const handleChangState = async () => {
    const status =
      detail.product_state == "available" ? "deleted" : "available";

    try {
      const res = await axios.put(`http://localhost:3300/api/product/${id}`, {
        product_state: status,
      });

      if (res.status == 200) {
        console.log(res.data);

        setDetail((detail) => {
          return { ...detail, product_state: status };
        });
        showSucess("Change State Successfully!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="relative">
            <img
              src={`data:image/jpeg;base64,${detail.product_image}`}
              alt=""
              className="w-full"
            />
            <span className="absolute right-0 top-0 text-2xl   bg-blue-300 p-4">
              {detail.product_state.toUpperCase()}
            </span>
          </div>
          <div className=" flex flex-col gap-5">
            <div className="flex flex-row items-center gap-16">
              <div>
                <h1 className=" text-4xl uppercase font-bold">
                  {detail.product_name}
                </h1>
              </div>

              <div>
                <button
                  onClick={handleChangState}
                  className="flex flex-row items-center text-white bg-green-400 p-2 rounded-2xl"
                >
                  <MdSwitchAccessShortcut className="text-4xl" />
                  <span>Change State</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col ">
              <p className="font-bold text-3xl">
                $ <span className="ml-3">{detail.product_unit_price}</span>
              </p>
              <div className="font-bold text-3xl flex items-center gap-2">
                <FaStar className="text-yellow-500 " />
                <p>{detail.product_rating}/10</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex gap-2 justify-center items-center">
                <button
                  className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                  onClick={handleMinusQuantity}
                >
                  -
                </button>
                <span className="bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                  {quantity}
                </span>
                <button
                  className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                  onClick={handlePlusQuantity}
                >
                  +
                </button>
              </div>
              <button
                className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>

            <p className="max-h-[200px] h-[200px] overflow-auto ">
              {detail.product_description}
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-1">
                  <IoPersonCircleOutline className="text-4xl" />
                  <span className="text-xl">Chị Chi:</span>

                  <div className="font-bold text-2xl flex items-center gap-2">
                    <FaStar className="text-yellow-500 " />
                    <p>8/10</p>
                  </div>
                </div>
                <p className="font-light">
                  Cà phê cappuccino là một lựa chọn tuyệt vời cho những ai yêu
                  thích sự kết hợp hoàn hảo giữa cà phê đậm đà và sữa tạo bọt
                  mịn màng. Mỗi ngụm là sự cân bằng giữa vị đắng của espresso và
                  sự ngọt ngào, mềm mại của sữa, tạo nên một trải nghiệm thú vị
                  cho vị giác. Lớp bọt sữa mịn, như một lớp kem nhẹ nhàng, không
                  chỉ làm tăng thêm hương vị mà còn tạo ra một cảm giác thư giãn
                  khi thưởng thức.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <IoPersonCircleOutline className="text-4xl" />
                  <span className="text-xl">Anh Phát:</span>

                  <div className="font-bold text-2xl flex items-center gap-2">
                    <FaStar className="text-yellow-500 " />
                    <p>6/10</p>
                  </div>
                </div>
                <p className="font-light">
                  Thật tiếc khi phải nói rằng cà phê pha sẵn này không đáp ứng
                  được kỳ vọng. Mặc dù được quảng cáo là có hương vị đậm đà và
                  thơm ngon, nhưng thực tế, nó lại thiếu đi độ sâu của hương vị
                  và cảm giác tươi mới mà một tách cà phê thực sự mang lại. Vị
                  cà phê hơi nhạt và có cảm giác như bị pha loãng quá mức, làm
                  mất đi sự mạnh mẽ của hạt cà phê.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
