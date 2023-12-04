import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { IoTrashBin } from "react-icons/io5";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";

const Cart = () => {
  const {
    cart: { cartItems }, addToCart, removeCartItem
  } = useAppContext();

  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/app/product/${item._id}`);
    if (data.stockQuantity < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }
    try {
      await addToCart(item, quantity);
      toast.success(`Cart update successful`);
      //navigate('/cart');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }

  const handleRemoveCartItem = async(item) => {
    removeCartItem(item)
  }

  return (
    <div className="bg-gray-200">
      <Navbar />
      {cartItems.length === 0 ? (
        <div className="mt-20 pt-8 p-4 rounded shadow-md">
          <p className="text-lg font-semibold">
            Cart is empty. <Link to="/">Go Shopping</Link>
          </p>
        </div>
      ) : (
        <main className="custom-container flex flex-col md:flex-row ">
          <aside className="md:hidden bg-white md:mr-6 rounded-md p-2 mt-20 mb-2  lg:mt-10 ">
            <div className="font-bold mb-2">CART SUMMARY</div>
            <div className="flex justify-between">
              <div>SubTotal</div>
              <div className="font-bold">N 1777.00</div>
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
                      {item.quantity > 0 ? (
                        <p className="italic text-sm">In Stock</p>
                      ) : (
                        <p className="italic text-sm ">Out of Stock</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-yellow-400" onClick={() => handleRemoveCartItem(item)}>
                      <IoTrashBin />
                      <p className="ml-2">REMOVE</p>
                    </div>
                    <div className="flex  mx-3 text-yellow-400 px-3 py-1 rounded-lg">
                      <AiFillPlusSquare size={25}     onClick={() =>
                          updateCart(item, item.quantity + 1)
                        } />
                      <p className="mx-5 text-black">{item.quantity}</p>
                      <AiFillMinusSquare size={25} onClick={() =>
                          updateCart(item, item.quantity - 1)
                        }  />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <aside className="md:w-3/4 bg-white md:mr-6 rounded-md p-3 hidden md:block">
            <div>Cart(3)</div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
            incidunt perspiciatis provident neque vitae nemo delectus velit
            quidem praesentium quia eos corrupti perferendis tempore, veniam
            fugit dolores! Sint, non dignissimos.
          </aside>
          <section className="md:w-1/4 mt-3 bg-white rounded-sm hidden md:block">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti,
            qui temporibus magnam2222 iusto omnis modi non ipsa dolor, enim
            nobis dolorum asperiores sapiente architecto harum suscipit vero
            pariatur officia at..
          </section>
        </main>
      )}
      ;
    </div>
  );
};

export default Cart;
