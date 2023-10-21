import { useState, useEffect } from "react";
import { Logo, FormRow } from "../../components/";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const AdminSignup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { user, adminSignup, adminSignin, isLoading } = useAppContext();

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
      adminSignin(currentUser);
    }else{
      adminSignup(currentUser);
    }

  };

  useEffect(() => {
    if(user){
      setTimeout(()=> {
        navigate('/admin-dashboard')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <>
      <div className="min-h-screen grid items-center bg-gray-200">
        <form className="form border-t-4 border-solid border-yellow-500" onSubmit={onSubmit}>
          <Logo />
         
          <h3 className="mt-6 text-center">{values.isMember ? 'Admin Signin' : 'Admin Signup'}</h3>

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
          {values.isMember ? 'Not an admin yet? ' : 'Already an admin? '}
          <button  type='button' onClick={toggleMember} className='bg-transparent border-transparent cursor-pointer text-blue-500 '>
           
            {values.isMember ? 'Signup' : 'Signin'}
          </button>
        </p>
        </form>
      </div>
    </>
  );
};

export default AdminSignup;
