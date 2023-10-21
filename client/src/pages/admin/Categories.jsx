import { useState, useEffect } from "react";
import { FormRow } from "../../components/";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  description: "",
};

const Categories = () => {
  // const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const handleCategoryInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //made use of dynamic object keys to easily handle update in input state
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = values;
    if (!name || !description) {
      toast.error("Please Provide all values");
      return;
    }

    try {
      const category = { name, description };
      await axios.post("/api/v1/app/category", category);
      toast.success("Category Added", {
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
        <h3>Add Categories</h3>
        <div className="grid gap-y-4 md:grid-cols-2 md:gap-x-4">
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleCategoryInput}
          />
          <FormRow
            type="text"
            name="description"
            value={values.description}
            handleChange={handleCategoryInput}
          />

        </div>
        <button className="btn btn-block md:self-end " type="submit">
            Submit
          </button>
      </form>
    </div>
  );
};

export default Categories;
