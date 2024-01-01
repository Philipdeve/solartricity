import { useState, useEffect } from "react";
import { Logo, FormRow } from "../../components/";
import { useAppContext } from "../../context/appContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import Navbar from "../../components/Navbar";
import { Helmet} from 'react-helmet-async';

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const UserSignup = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [values, setValues] = useState(initialState);

  const { user, signup, signin, isLoading } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //made use of dynamic object keys to easily handle update in input state
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember &&  !name)) {
      toast.error("Please Provide all values")
      return
    }
    const currentUser = { name, email, password };  
   
    if(isMember){
      signin(currentUser);
    }else{
      signup(currentUser);
    }

  };

  useEffect(() => {
    if(user){
      navigate(redirect);
    }
  }, [navigate, user, redirect])

  return (
    <>
         <Helmet>
        <title>
          Solartricity | {values.isMember ? 'Signin' : 'Signup'}
        </title>
      </Helmet>
      <Navbar />  
      <div className="min-h-screen grid items-center bg-gray-200 xl:items-start lg:mt-10 xl:mt-16">
        <form className="form border-t-4 border-solid border-yellow-500 " onSubmit={onSubmit}>
          <h3 className="mt-6 text-center">{values.isMember ? 'Signin' : 'Signup'}</h3>

          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}

          {/* email input */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />

          {/* email input */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />

          <button type="submit" className="btn mt-4 w-full" disabled={isLoading}>
            submit
          </button>

          <p className="m-0 mt-4 text-center">
          {values.isMember ? 'New Customer ? ' : 'Have an Account ? '}
          <button  type='button' onClick={toggleMember} className='bg-transparent border-transparent cursor-pointer text-blue-500 '>
           
            {values.isMember ? 'Signup' : 'Signin'}
          </button>
        </p>
        </form>
      </div>
    </>
  );
};

export default UserSignup;
