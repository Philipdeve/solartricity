import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus, CiShoppingCart } from "react-icons/ci";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";


const Product = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [stockQuantity, setStockQuantity] = useState(0);

  const increaseQuantity = () => {
    //setQuantity((prevQuantity) => Math.min(prevQuantity + 1, stockQuantity));
    setQuantity((prevQuantity) => {
      const newQuantity = Math.min(prevQuantity + 1, stockQuantity);
      if (isNaN(newQuantity)) {
        return prevQuantity;
      }
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity - 1, 1); 
      return newQuantity;
    });
  };
 
  const { addToCart } = useAppContext();

  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
      navigate('/cart');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };


  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await axios.get(`/api/v1/app/product/slug/${slug}`);
        setProduct(response.data);
      };
      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }, [slug]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await axios.get(`/api/v1/app/product/stockquantity/${slug}`);
        setStockQuantity(response.data.stockQuantity);
      };
      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }, [slug]);

  //RE: refactor this useEffect 

  return (
    <>
      <Navbar />
      <header className="m-5 lg:mt-10 pt-16 flex items-center">
        <Link to={"/"} className="mr-2">Home</Link>
        <FaChevronRight />
        <span className="ml-2">{product.name}</span>
      </header>
      <main className="custom-container flex flex-col md:flex-row">
        <div className="md:w-1/2 md:mr-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full lg:w-3/4"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-xl lg:text-3xl text-yellow-400 font-bold">
            {product.name}
          </p>
          <p className="text-lg lg:text-xl my-5">&#8358; {product.price}</p>
          <div className="flex">
            <p>Quantity: </p>
            <div className="flex  mx-3 text-yellow-500 px-3 py-1 rounded-lg">
              <AiFillPlusSquare size={25} onClick={increaseQuantity} />
              <p className="mx-5 text-black">{quantity}</p>
              <AiFillMinusSquare size={25} onClick={decreaseQuantity} />
            </div>
          </div>

          <button
            className="p-2 lg:p-3 flex items-center w-full bg-yellow-400 rounded-md mt-7 justify-center lg:text-xl hover:bg-yellow-600 transition-all text-white"
            onClick={handleAddToCart}
          >
            <CiShoppingCart /> &nbsp; Add to Cart
          </button>

          <div className="flex items-center mt-5">
          <Link to={"/contact"} className="text-yellow-600 mr-2 ">Ask about this product   </Link> 
          <FaArrowRight />
          </div>
        
        </div>

        
      </main>
      <section className="custom-container">
          <h3 className="font-bold">Product Details</h3>
          <h5 className="text-sm lg:text-xl">Brand: {product.brand}</h5>
          <h5 className="text-xl lg:text-2xl font-medium">{product.name}</h5>
          <p>{product.description}</p>
      </section>
    </>
  );
};

export default Product;
