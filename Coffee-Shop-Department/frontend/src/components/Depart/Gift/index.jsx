import React, { useEffect, useState } from "react";
import CardGift from "./cardGift";
import { showFail, showSucess } from "../../Alert/Alert";

import axios from "axios";

export default function gift() {
  const [gifts, setGift] = useState([]);
  const [phone, setPhone] = useState("");
  const [point, setPoint] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/gifts")
      .then((res) => {
        console.log(res.data);
        setGift(res.data);
        setLoading(false); // Stop loading
      })
      .catch((e) => {
        console.log(e);
        setLoading(false); // Stop loading
      });
  }, []);

  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/3 ">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handlephone = () => {
    axios
      .post("http://localhost:3300/api/check-phone", {
        phone_number: phone,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.customer_point < 0) {
          setPoint("");
          showFail(res.data.error_message);
        } else {
          setPoint(res.data.customer_point);
        }
      })
      .catch((error) => {
        console.error("Error fetching Phone:", error);
      });
  };

  function CheckPhone(e) {
    e.preventDefault();
    handlephone();
  }

  return (
    <>
      <div className="flex items-center gap-20">
        <form onSubmit={CheckPhone} className="flex items-center gap-2">
          <label htmlFor="phone" className="text-2xl">
            Nhập phonenumber của khách:
          </label>
          <input
            required
            type="number"
            value={phone}
            id="phone"
            name="phone"
            className=" p-2 border border-gray-300 rounded "
            placeholder="0795759610 ......."
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit" className=" bg-blue-500 text-white rounded p-2">
            Check
          </button>
        </form>

        {point != "" && (
          <div className="text-2xl border-l-8 border-black pl-10">
            <span>Điểm của quý khách là: </span>
            <span>{point}</span>
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 px-10 mt-4 ">
        {gifts.length === 0 ? (
          <p className="text-center text-gray-500">No gifts found</p>
        ) : (
          gifts.map((gift) => {
            return <CardGift data={gift} />;
          })
        )}
      </div>
    </>
  );
}
