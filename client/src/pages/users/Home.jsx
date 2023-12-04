import Navbar from "../../components/Navbar";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [solarpanels, setSolarPanels] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [inverters, setInverters] = useState([]);

  const fetchSolarPanels = async () => {
    try {
      const response = await axios.get("/api/v1/app/products/solar-panels");
      setSolarPanels(response.data);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchBatteries = async () => {
    try {
      const response = await axios.get("/api/v1/app/products/batteries");
      setBatteries(response.data);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const fetchInverters = async () => {
    try {
      const response = await axios.get("/api/v1/app/products/inverters");
      setInverters(response.data);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchSolarPanels();
    fetchBatteries();
    fetchInverters();
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <article className="mt-10 py-16  bg-[url('/images/bannerimg.jpg')] h-[80vh] bg-cover bg-center bg-no-repeat lg:h-screen ">
        <div className="flex flex-col items-center justify-center h-full">
          <h4 className="bg-yellow-400   text-gray-600 p-2 md:text-5xl lg:text-7xl font-extrabold mb-2">
            SAVE ON
          </h4>
          <h3 className="text-white text-center font-bold md:text-4xl lg:text-4xl">
            ELECTRICITY BILLS BY GOING SOLAR
          </h3>
        </div>
      </article>
      <section>
        <div className="w-[85vw] lg:w-[90vw] mx-auto my-0 max-w-6xl py-7">
          <div className="flex justify-around">
            <h3 className="text-2xl md:text-4xl">Shop Solar Panels</h3>
            <Link
              to=""
              className="underline text-sm text-yellow-400 mt-1 md:text-lg"
            >
              See All
            </Link>
          </div>
          <p>
            Shop for Tier 1 solar panels. From Trina, Canadian Solar, QCells and
            JA Solar to ZNShine, Phono Solar, VSUN or Meyer Berger, we offer the
            best solar panel prices and availability in the market.
          </p>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="w-[85vw] lg:w-[90vw] mx-auto my-0 max-w-6xl py-7">
          <Slider {...settings}>
            {solarpanels.map((product) => (
              <div
                key={product.id}
                className="shadow-md hover:shadow-2xl p-5  grid gap-9 overflow-hidden h-[320px] md:h-[370px] lg:h-[450px]"
              >
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full  mb-10 md:h-[200px] lg:h-[250px]"
                  />
                  <h1 className="font-bold text-sm text-yellow-400">
                    {product.name.substring(0, 18) + "....."}
                  </h1>
                </Link>
                <p className="mt-3 font-bold">&#8358; {product.price}</p>
                {/* <button className="bg-[#ff6b00] text-white text-sm py-2 px-4 rounded-lg my-4 mx-auto hidden lg:block">
                  View Product
                </button> */}
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section>
        <div className="w-[85vw] lg:w-[90vw] mx-auto my-0 max-w-6xl py-7">
          <div className="flex justify-around">
            <h3 className="text-2xl md:text-4xl">Shop Solar Batteries</h3>
            <Link
              to=""
              className="underline text-sm text-yellow-400 mt-1 md:text-lg"
            >
              See All
            </Link>
          </div>
          <p>
            Shop for Tier 1 solar panels. From Trina, Canadian Solar, QCells and
            JA Solar to ZNShine, Phono Solar, VSUN or Meyer Berger, we offer the
            best solar panel prices and availability in the market.
          </p>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="w-[85vw] lg:w-[90vw] mx-auto my-0 max-w-6xl py-7">
          <Slider {...settings}>
            {batteries.map((product) => (
              <div
                key={product.id}
                className="shadow-md hover:shadow-2xl p-5  grid gap-9 overflow-hidden h-[320px] md:h-[370px] lg:h-[450px]"
              >
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full  mb-10 md:h-[200px] lg:h-[250px]"
                  />
                  <h1 className="font-bold text-sm text-yellow-400">
                    {product.name.substring(0, 18) + "....."}
                  </h1>
                </Link>
                <p className="mt-3 font-bold">&#8358; {product.price}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section>
        <div className="w-[85vw] lg:w-[90vw] mx-auto my-0 max-w-6xl py-7">
          <div className="flex justify-around">
            <h3 className="text-2xl md:text-4xl">Shop Inverters</h3>
            <Link
              to=""
              className="underline text-sm text-yellow-400 mt-1 md:text-lg"
            >
              See All
            </Link>
          </div>
          <p>
            Shop for Tier 1 Inverters From Trina, Canadian Solar, QCells and
            JA Solar to ZNShine, Phono Solar, VSUN or Meyer Berger, we offer the
            best solar panel prices and availability in the market.
          </p>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="w-[85vw] lg:w-[90vw] mx-auto my-0 max-w-6xl py-7">
          <Slider {...settings}>
            {inverters.map((product) => (
              <div
                key={product.id}
                className="shadow-md hover:shadow-2xl p-5  grid gap-9 overflow-hidden h-[320px] md:h-[370px] lg:h-[450px]"
              >
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full  mb-10 md:h-[200px] lg:h-[250px]"
                  />
                  <h1 className="font-bold text-sm text-yellow-400">
                    {product.name.substring(0, 18) + "....."}
                  </h1>
                </Link>
                <p className="mt-3 font-bold">&#8358; {product.price}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Home;
