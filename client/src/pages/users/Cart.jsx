import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { IoTrashBin } from "react-icons/io5";
import { AiFillPlusSquare, AiFillMinusSquare, AiOutlineShoppingCart } from "react-icons/ai";
import { Helmet} from 'react-helmet-async';

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart: { cartItems },
    addToCart,
    removeCartItem,
  } = useAppContext();

  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/app/product/${item._id}`);
    if (data.stockQuantity < quantity) {
      toast.error("Product Stock Limit reached");
      return;
    }
    try {
      await addToCart(item, quantity);
      toast.success(`Cart update successful`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleRemoveCartItem = async (item) => {
    removeCartItem(item);
  };

  const checkout = async () => {
    navigate("/signup?redirect=/checkout/shipping")
  }

  const totalNumeric = cartItems.reduce((accumulator, currentItem) => {
    const numericPrice = parseFloat(currentItem.price.toString().replace(/,/g, ""));
    if (isNaN(numericPrice) || isNaN(currentItem.quantity)) {
      toast.error(`Invalid price or quantity for ${currentItem.name}`);
      return accumulator;
    }
    const itemValue = numericPrice * currentItem.quantity;
    return accumulator + itemValue;
  }, 0);

  const totalFormatted = new Intl.NumberFormat().format(totalNumeric);



  return (
    <div className="bg-gray-200">
      <Helmet>
        <title>
          Solartricity | Cart
        </title>
      </Helmet>

      <Navbar />
      {cartItems.length === 0 ? (
        <div className="mt-20 lg:mt-16 pt-8 p-4  ">
          <div className="lg:bg-white custom-container text-center ">
            <div className="flex justify-center mb-4 p-3 floating text-yellow-400">
              <AiOutlineShoppingCart  size={50}/>
            </div>
            <p className="text-lg lg:text-xl font-semibold">
              Your Cart is empty!
            </p>
            <p className="mb-4 lg:mb-8">Browse our categories and discover our best deals!</p>
            <Link to={"/"} className="bg-yellow-400 transition text-white duration-300   p-2 px-6 text-base rounded-lg   mx-2 border-none cursor-pointer hover:bg-yellow-600 font-medium ">
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <main className="custom-container flex flex-col md:flex-row ">
          <aside className="md:hidden bg-white md:mr-6 rounded-md p-2 mt-20 mb-2  lg:mt-10 ">
            <div className="font-bold mb-2">CART SUMMARY</div>
            <div className="flex justify-between">
              <div>SubTotal</div>
              {/* <div className="font-bold"> {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</div> */}
              <div className="font-bold">&#8358; {totalFormatted}</div>
            </div>
          </aside>
          <aside className="md:w-3/4 bg-white md:mr-6 rounded-md p-3 md:hidden">
            <div>Cart({cartItems.length})</div>
            <div className="grid grid-cols-1 gap-4 mt-2 ">
              {cartItems.map((item) => (
                <div key={item._id} className="card">
                  <div className="flex">
                    <img className="w-1/3 mr-1" src={item.image}></img>
                    <div>
                      <small>{item.name}</small>
                      <p className="font-bold text-xl">&#8358; {item.price}</p>
                      {item.stockQuantity > 0 ? (
                        <p className="italic text-sm">In Stock</p>
                      ) : (
                        <p className="italic text-sm ">Out of Stock</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      className="flex items-center text-yellow-400 transition-all hover:bg-gray-200 p-2  cursor-pointer"
                      onClick={() => handleRemoveCartItem(item)}
                    >
                      <IoTrashBin />
                      <p className="ml-2">REMOVE</p>
                    </div>
                    <div className="flex  mx-3 text-yellow-400 px-3 py-1 rounded-lg">
                      <AiFillPlusSquare
                        size={25}
                        onClick={() => updateCart(item, item.quantity + 1)}
                      />
                      <p className="mx-5 text-black">{item.quantity}</p>
                      <button disabled={item.quantity === 1}>
                        <AiFillMinusSquare
                          size={25}
                          onClick={() => updateCart(item, item.quantity - 1)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={checkout} className="bg-yellow-400 transition text-white duration-300 w-3/4 mx-auto   p-2 text-base rounded-sm  flex justify-center  mt-2 border-none cursor-pointer hover:bg-yellow-600 font-medium ">
              Checkout
            </button>
          </aside>
          <aside className="md:w-3/4 bg-white md:mr-6 rounded-md p-3 hidden md:block  mb-2  md:mt-20">
            <div className="text-xl font-semibold">
              Cart ({cartItems.length})
            </div>
            <div className="grid grid-cols-1 gap-4 mt-2 ">
              {cartItems.map((item) => (
                <div key={item._id} className="card">
                  <div className="flex">
                    <img className="w-[15%] mr-1" src={item.image}></img>
                    <div>
                      <p className="text-base">{item.name}</p>
                      <p className="font-bold text-xl">&#8358; {item.price}</p>
                      {item.stockQuantity > 0 ? (
                        <p className="italic text-sm">In Stock</p>
                      ) : (
                        <p className="italic text-sm ">Out of Stock</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      className="flex items-center text-yellow-400 transition-all hover:bg-gray-200 p-2  cursor-pointer"
                      onClick={() => handleRemoveCartItem(item)}
                    >
                      <IoTrashBin />
                      <p className="ml-2">REMOVE</p>
                    </div>
                    <div className="flex  mx-3 text-yellow-400 px-3 py-1 rounded-lg">
                      <AiFillPlusSquare
                        size={30}
                        onClick={() => updateCart(item, item.quantity + 1)}
                      />
                      <p className="mx-5 text-black text-lg">{item.quantity}</p>
                      <button disabled={item.quantity === 1}>
                        <AiFillMinusSquare
                          size={30}
                          onClick={() => updateCart(item, item.quantity - 1)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <section className="md:w-1/4 mt-3 bg-white rounded-sm hidden md:block md:mt-20 md:h-[130px]">
            <h4 className="text-sm text-center my-2">CART SUMMARY</h4>
            <div className="flex justify-between border-t-2 border-solid border-gray-300 p-2">
              <div className="text-sm">SubTotal</div>
              <div className="font-bold">&#8358; {totalFormatted}</div>
            </div>
            <button onClick={checkout} className="bg-yellow-400 transition text-white duration-300   p-2 text-base rounded-sm  flex justify-center  w-3/4 mx-auto  border-none cursor-pointer hover:bg-yellow-600 font-medium ">
              Checkout
            </button>
          </section>
        </main>
      )}
      ;
    </div>
  );
};

export default Cart;
