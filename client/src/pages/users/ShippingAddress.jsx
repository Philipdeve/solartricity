import Navbar from "../../components/Navbar";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { FormRow } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShippingAddress = () => {
  const navigate = useNavigate();

  const {
    cart: { shippingAddress },
    user,
    saveShippingAddress,
  } = useAppContext();

  const initialState = {
    fullname: shippingAddress.fullname || "",
    address: shippingAddress.address || "",
    phone: shippingAddress.phone || "",
    city: shippingAddress.city || "",
    state: shippingAddress.state || "",
    country: shippingAddress.country || "",
  };

  
  const [values, setValues] = useState(initialState);
  const [countries, setCountries] = useState([]);

  const handleShippingInput = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { fullname, address, phone, city, state, country } = values;
    if ( !fullname || !address || !phone || !city || !state || !country) {
      toast.error("Please Provide all values");
      return
    }
    const shippingData = { fullname, address, phone, city, state, country };
    await saveShippingAddress(shippingData);
    navigate("/checkout/summary");
  };

  useEffect(() => {
    if (!user) {
      navigate("/signup?redirect=/checkout/shipping")
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?sort=name"
      );
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  return (
    <>
      <Helmet>
        <title>Solartricity | Checkout</title>
      </Helmet>

      <Navbar />
      <div className="mt-10 py-16 px-5 bg-gray-200">
        <form className="custom-container bg-white p-5 " onSubmit={onSubmit}>
          <h2>Customer Address</h2>
          <div className="grid gap-y-4 md:grid-cols-4  md:gap-x-4">
            <FormRow
              type="text"
              name="fullname"
              labelText="Full Name"
              value={values.fullname}
              handleChange={handleShippingInput}
            />
            <FormRow
              type="text"
              name="address"
              labelText="Delivery Address"
              value={values.address}
              handleChange={handleShippingInput}
            />
            <FormRow
              type="text"
              name="phone"
              value={values.phone}
              handleChange={handleShippingInput}
            />
            <div className="mb-4">
              <label htmlFor="category" className="block mb-3">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={values.country}
                onChange={handleShippingInput}
                className="w-full border-solid border-2 border-gray-300 rounded"
              >
                <option value="">Select Country</option>

                {countries.map((country) => (
                  <option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
            <FormRow
              type="text"
              name="state"
              value={values.state}
              handleChange={handleShippingInput}
            />
            <FormRow
              type="text"
              name="city"
              value={values.city}
              handleChange={handleShippingInput}
            />
            <button className="btn btn-block md:self-end " type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingAddress;
