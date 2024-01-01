import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { FaRegClock } from "react-icons/fa";

const Summary = () => {
  const {
    cart
  } = useAppContext();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23

  const totalNumeric = cart.cartItems.reduce((accumulator, currentItem) => {
    const numericPrice = parseFloat(currentItem.price.toString().replace(/,/g, ""));
    if (isNaN(numericPrice) || isNaN(currentItem.quantity)) {
      toast.error(`Invalid price or quantity for ${currentItem.name}`);
      return accumulator;
    }
    const itemValue = numericPrice * currentItem.quantity;
    return accumulator + itemValue;
  }, 0);

  cart.itemsPrice = new Intl.NumberFormat().format(totalNumeric);
  cart.shippingPrice = cart.itemsPrice > 10000 ? round2(0) : round2(1500);
  const totalPrice = parseFloat(cart.itemsPrice.replace(/,/g, "")) + cart.shippingPrice;
  cart.totalPrice = new Intl.NumberFormat().format(totalPrice);

  return (
    <>
      <Helmet>
        <title>Solartricity | Checkout Summary</title>
      </Helmet>
      <Navbar />
      <div className="bg-gray-200">
        <main className="custom-container md:w-[95vw] flex flex-col md:flex-row">
          <section className="md:hidden bg-white md:mr-6 rounded-md p-2 mt-20 mb-2  lg:mt-10">
            <div className="font-bold mb-2 ">ORDER SUMMARY</div>
            <div className="mx-1 p-2  ">
              <div className="flex justify-between mb-2">
                <div>Items Total ({cart.cartItems.length}) </div>
                <div className="font-bold">&#8358;  {cart.itemsPrice}</div>
              </div>
              <div className="flex justify-between mb-2 border-t-2 border-gray-200 pt-3">
                <div>Delivery Fee</div>
                <div className="font-bold">&#8358; {cart.shippingPrice} </div>
              </div>
              <div className="flex justify-between  border-t-2 border-gray-200 pt-6">
                <div className="font-bold">Total</div>
                <div className="font-bold">&#8358; {cart.totalPrice} </div>
              </div>
            </div>
          </section>
          <section className="md:hidden bg-white md:mr-6 rounded-md p-2 mb-2">
            <div className="flex justify-between">
              <div className="font-bold mb-2">Customer Address</div>
              <Link
                to="/checkout/shipping"
                className="underline text-sm text-yellow-400 mt-1 md:text-lg"
              >
                Change
              </Link>
            </div>
            <div className="border-t-2 border-gray-200 p-2">
              <p>{cart.shippingAddress.fullname}</p>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.state}, {cart.shippingAddress.country}
              </p>
            </div>
          </section>

          <section className="md:hidden bg-white md:mr-6 rounded-md p-2 mb-2">
            <div className="flex justify-between">
              <div className="font-bold mb-2">Items</div>
              <Link
                to="/cart"
                className="underline text-sm text-yellow-400 mt-1 md:text-lg"
              >
                Modify Cart
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 my-3">
              {cart.cartItems.map((item) => (
                <div key={item._id} className="card">
                  <div className="flex">
                    <img className="w-1/3 mr-1" src={item.image}></img>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-yellow-500 mb-1">
                        QTY: {item.quantity}
                      </p>
                      <div className="flex items-center">
                        <FaRegClock /> &nbsp; Delivery in 3 Days
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-yellow-400 transition text-white duration-300   p-2 text-base rounded-sm  flex justify-center  w-3/4 mx-auto  border-none cursor-pointer hover:bg-yellow-600 font-medium ">
              Place Order
            </button>
          </section>

          <section className="md:w-3/5 md:mr-6 rounded-md p-3 hidden md:block  mb-2  md:mt-20">
            <div className="bg-white">
              <div className="flex justify-between p-2">
                <div className="font-bold mb-2">Customer Address</div>
                <Link
                  to="/checkout/shipping"
                  className="underline text-sm text-yellow-400 mt-1 md:text-lg"
                >
                  Change
                </Link>
              </div>
              <div className="border-t-2 border-gray-200 p-2">
                <p>{cart.shippingAddress.fullname}</p>
                <p>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.state}, {cart.shippingAddress.country}
                </p>
              </div>
            </div>

            <div className="bg-white my-2 p-4">
              <div className="flex justify-between ">
                <div className="font-bold mb-2">Items</div>
                <Link
                  to="/cart"
                  className="underline text-sm text-yellow-400 mt-1 md:text-lg"
                >
                  Modify Cart
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 my-3">
                {cart.cartItems.map((item) => (
                  <div key={item._id} className="card">
                    <div className="flex">
                      <img className="w-[20%] lg:w-[15%] mr-1" src={item.image}></img>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-yellow-500 mb-1">
                          QTY: {item.quantity}
                        </p>
                        <div className="flex items-center">
                          <FaRegClock /> &nbsp; Delivery in 3 Days
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
            </div>
          </section>

          <section className="md:w-2/5  bg-white rounded-sm hidden md:block md:mt-20 md:h-[250px]">
            <div className="font-bold my-2 text-center ">ORDER SUMMARY</div>
            <div className="mx-1 p-2 mb-3 ">
              <div className="flex justify-between mb-2">
                <div>Items Total ({cart.cartItems.length}) </div>
                <div className="font-bold">&#8358; {cart.itemsPrice}</div>
              </div>
              <div className="flex justify-between mb-2 border-t-2 border-gray-200 pt-3">
                <div>Delivery Fee</div>
                <div className="font-bold">&#8358; {cart.shippingPrice}</div>
              </div>
              <div className="flex justify-between  border-t-2 border-gray-200 pt-6">
                <div className="font-bold">Total</div>
                <div className="font-bold">&#8358; {cart.totalPrice} </div>
              </div>
            </div>
            <button className="bg-yellow-400 transition text-white duration-300   p-2 text-base rounded-sm  flex justify-center  w-3/4 mx-auto  border-none cursor-pointer hover:bg-yellow-600 font-medium ">
                Place Order
              </button>
          </section>
        </main>
      </div>
    </>
  );
};

export default Summary;
