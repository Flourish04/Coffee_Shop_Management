import React from "react";
import iconCart from "../../assets/iconCart.png";
import iconSale from "../../assets/sale.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";

export default function Card_Product(props) {
  const {
    product_discount,
    product_id,
    product_name,
    product_type,
    product_category,
    product_unit_price,
    product_rating,
    product_state,
    product_image,
  } = props.data;

  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product_id,
        name: product_name,
        price: product_unit_price,
        quantity: 1,
        discount: product_discount,
        img: product_image,
      })
    );
  };
  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-sm relative ">
        {product_discount != 0 ? (
          <>
            {/* Sale Icon */}
            <div className="w-20 h-20 absolute -right-2 -top-1 z-10">
              <img src={iconSale} alt="Sale Icon" />
            </div>

            {/* Discount Badge */}
            <p className="text-2xl  font-semibold text-white bg-red-500 px-4 py-1 rounded-full absolute left-1 top-40 z-10">
              {product_discount}% Off
            </p>
          </>
        ) : (
          <></>
        )}

        <Link to={`${product_id}`}>
          <div className="flex flex-row">
            <img
              src={`data:image/jpeg;base64,${product_image}`}
              alt=""
              className="w-full h-40 object-cover object-top drop-shadow-[0_80px_30px_#0007]"
            />
          </div>
        </Link>
        <h3 className="text-2xl pt-3 text-center font-medium line-clamp-1 hover:line-clamp-none">
          {product_name}
        </h3>
        <div className="flex justify-between items-center pt-1">
          <p>
            <span className="text-2xl font-medium">{product_unit_price} $</span>
          </p>
          <button
            className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
            onClick={handleAddToCart}
          >
            <img src={iconCart} alt="" className="w-5" />
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
