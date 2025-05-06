import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../../../stores/cart";
import { clearCart } from "../../../stores/cart";
import CartItem from "./cartItem";
import { showFail, showSucess } from "../../Alert/Alert";
import axios from "axios";

export default function cartTab() {
  const [phone, setPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState([]);
  const [tableId, setTableId] = useState(0);
  const [table, setTable] = useState([]);
  const [quantityTotal, setQuantity] = useState("");
  const [priceTotal, setPrice] = useState("");
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleEmployee = (id) => {
    const params = {
      department_id: id,
      position: "Cashier",
    };
    axios
      .get("http://localhost:3300/api/employees", { params })
      .then((response) => {
        setEmployee(response.data);
        setEmployeeId(response.data[0].employee_id);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleTable = async (id) => {
    axios
      .post("http://localhost:3300/api/tables", {
        department_id: id,
      })
      .then((response) => {
        setTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Tables:", error);
      });
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      handleEmployee(id);
      handleTable(id);
    }
  }, []);
  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    carts.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += (item.quantity * item.price * (100 - item.discount)) / 100;
    });

    setQuantity(totalQuantity);
    setPrice(totalPrice.toFixed(2));
  }, [carts]);

  const CheckPhone = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3300/api/check-phone", {
        phone_number: phone,
      })
      .then((res) => {
        if (res.data.customer_point < 0) {
          showFail(res.data.error_message);
        } else {
          showSucess(`${phone} already existed!!!`);
        }
      })
      .catch((error) => {
        console.error("Error fetching Phone:", error);
      });
  };

  function handleCheckout() {
    if (phone == "") {
      showFail("Please type phone");
      return;
    } else if (quantityTotal == 0) {
      showFail("No product to checkout");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("carts"));
    const simplifiedCart = cart.map((item) => ({
      productId: item.productId,
      price: item.price,
      discount: item.discount,
      quantity: item.quantity,
    }));

    console.log({
      department_id: localStorage.getItem("id"),
      phone: phone,
      employeeId: employeeId,
      tableId: tableId,
      quantityTotal: quantityTotal,
      priceTotal: priceTotal,
      cart: simplifiedCart,
    });

    axios
      .post("http://localhost:3300/api/order", {
        department_id: localStorage.getItem("id"),
        phone: phone,
        employeeId: employeeId,
        tableId: tableId,
        quantityTotal: quantityTotal,
        priceTotal: priceTotal,
        cart: simplifiedCart,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status == 400) {
          showFail(res.data.mess);
        } else {
          showSucess(res.data.mess);
          dispatch(clearCart());
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange:", error);
      });
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}
      >
        <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
        <div className="flex flex-col gap-2 mt-2 ">
          <div className="ml-3 flex flex-col gap-2 ">
            <div>
              <form
                onSubmit={CheckPhone}
                className="flex items-center gap-2   "
              >
                <label htmlFor="phone" className="text-white text-xl">
                  SĐT:
                </label>
                <input
                  required
                  type="number"
                  value={phone}
                  id="phone"
                  name="phone"
                  className="  border border-gray-300 rounded  "
                  placeholder="0795759610 ......."
                  onChange={(e) => setPhone(e.target.value)}
                />

                <button
                  type="submit"
                  className=" bg-blue-500 text-white rounded p-1 "
                >
                  Check
                </button>
              </form>
            </div>
            <div className="flex gap-2 mt-2">
              <label htmlFor="employee" className="text-xl  text-white">
                Nhân Viên:
              </label>
              <select
                name="employe"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {employee.length > 0 &&
                  employee.map((item) => {
                    return (
                      <>
                        <option
                          value={item.employee_id}
                          className="bg-gray-300"
                        >
                          {item.employee_last_name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="table" className="text-xl  text-white">
                Bàn: {tableId}
              </label>

              <div className="grid grid-cols-12 gap-1 px-1  mx-auto ">
                {table.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setTableId(item.table_id)}
                    className="p-1 border rounded-md bg-gray-300 hover:bg-gray-400"
                  >
                    {item.table_id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 overflow-auto max-h-[300px]  ">
            {carts.map((item, key) => (
              <CartItem key={key} data={item} />
            ))}
          </div>
          {quantityTotal != 0 && (
            <>
              <div className="flex justify-center gap-16 text-white text-2xl  mt-2">
                <span>Total: {priceTotal}$</span>

                <span>Quantity: {quantityTotal}</span>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2">
          <button className="bg-black text-white" onClick={handleCloseTabCart}>
            CLOSE
          </button>
          <button onClick={handleCheckout} className="bg-amber-600 text-white">
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
