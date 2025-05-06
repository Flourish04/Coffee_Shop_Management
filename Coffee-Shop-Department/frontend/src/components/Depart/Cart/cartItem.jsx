import React from "react";
import { useDispatch } from "react-redux";
import cartIcon from "../../../assets/iconCart.png";
import { changeQuantity } from "../../../stores/cart";

export default function cartItem(props) {
  const { productId, name, price, quantity, discount, img } = props.data;
  const dispatch = useDispatch();

  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  };

  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  };
  return (
    <>
      <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
        <img src={`data:image/jpeg;base64,${img}`} alt="" className="w-12" />
        <h3>{name}</h3>
        <p>{((price * quantity * (100 - discount)) / 100).toFixed(2)}</p>
        <div className="w-20 flex justify-between gap-2">
          <button
            className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
            onClick={handleMinusQuantity}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
            onClick={handlePlusQuantity}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
