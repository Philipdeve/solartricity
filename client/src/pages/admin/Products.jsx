import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormRow } from "../../components/";

const initialState = {
  name: "",
  description: "",
  brand: "",
  price: "",
  stockQuantity: "",
  image: null,
  category: ""
};

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState(initialState);

  // Function to generate a slug from a string
  const generateSlug = (text) =>
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      slug: generateSlug(prevValues.name),
    }));
  }, [values.name]);

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    })); //using the callback function to ensure i get the current state
  };


  // const handleProductInput = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value }); //made use of dynamic object keys to easily handle update in input state
  // };

  const handleImageInput = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/api/v1/app/category");
      setCategories(response.data);
    };
    fetchCategories();
  }, []); // Empty dependency array to run this effect once on mount

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append form fields to FormData
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // Log the contents of the FormData object
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await axios.post("/api/v1/app/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product Added", {
        autoClose: 1000,
      });
      setValues(initialState);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-full bg-white  p-8 md:p-14">
      <form className="w-full max-w-full m-0 p-0" onSubmit={onSubmit}>
        <h3>Add Products</h3>
        <div className="grid gap-y-4 md:grid-cols-4 xl:grid-cols-5 md:gap-x-4">
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            name="slug"
            value={values.slug}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            name="brand"
            value={values.brand}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            name="description"
            value={values.description}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            name="price"
            value={values.price}
            handleChange={handleProductInput}
          />
          <FormRow
            type="number"
            name="stockQuantity"
            value={values.stockQuantity}
            handleChange={handleProductInput}
          />

          <div className="mb-4">
            <label className="block mb-3" htmlFor="">
              Upload Product Image
            </label>
            <input
              type="file"
              id="imageInput"
              name="image"
              onChange={handleImageInput}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-3">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleProductInput}
              className="w-full border-solid border-2 border-gray-300 rounded"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-block md:self-end " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Products;
