import React, { useState } from "react";
import iconCart from "../../../assets/iconCart.png";
import { ImGift } from "react-icons/im";
import axios from "axios";
import { showFail, showSucess } from "../../Alert/Alert";

export default function cardGift(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const { gift_id, gift_name, gift_point, gift_state, gift_image } = props.data;
  // Hàm mở popup
  const openForm = () => setIsOpen(true);

  // Hàm đóng popup
  const closeForm = () => setIsOpen(false);

  const SubmitForm = (e) => {
    e.preventDefault();
    console.log({
      phone_number: phone,
      gift_id: gift_id,
      gift_point: gift_point,
      quantity: quantity,
    });
    axios
      .post("http://localhost:3300/api/exchange-gift", {
        phone_number: phone,
        gift_id: gift_id,
        gift_point: gift_point,
        quantity: quantity,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status == 400) {
          showFail(res.data.mess);
        } else {
          showSucess(res.data.mess);
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange:", error);
      });
  };
  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-sm  ">
        <div className="flex flex-row">
          <img
            src={gift_image}
            alt=""
            className="w-full h-40 object-cover object-top drop-shadow-[0_80px_30px_#0007]"
          />
        </div>

        <h3 className="text-2xl pt-3 text-center font-medium line-clamp-1 hover:line-clamp-none">
          {gift_name}
        </h3>
        <div className="flex justify-between items-center pt-1">
          <p>
            <span className="text-2xl font-medium">{gift_point} points</span>
          </p>
          <button
            className=" bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2 items-center"
            onClick={openForm}
          >
            <ImGift />
            <span>Give Gift</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeForm} // Đóng form khi click ngoài popup
        >
          <div
            className="bg-gray-300 p-6 rounded-lg w-96 relative"
            onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click để không đóng khi click vào form
          >
            {/* Nút đóng */}
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-600"
            >
              &times;
            </button>
            <div className="flex justify-center">
              <h2 className="text-xl font-semibold mb-4 ">Đổi quà</h2>
            </div>

            <form onSubmit={SubmitForm}>
              <img src={gift_image} alt="" className="w-full h-40  " />
              <label htmlFor="phone" className="block mb-2 font-bold">
                Nhập SĐT khách hàng:
              </label>
              <input
                required
                type="number"
                value={phone}
                id="phone"
                name="phone"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="0795759610 ......."
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="quantity" className="block mb-2 font-bold">
                Nhập số lượng quà :
              </label>
              <input
                required
                min={1}
                type="number"
                value={quantity}
                id="quantity"
                name="quantity"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="1 ......."
                onChange={(e) => setQuantity(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
              >
                Đổi
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
