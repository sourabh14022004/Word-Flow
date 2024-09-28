import React, { useState } from 'react'
import Input from '../../../Utils/Input';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Bounce, Slide, toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';




const SignIn = ({ setSignReq }) => {
    const navigate = useNavigate();
    const [form , setForm] = useState( {
        email : "",
        password: "",

    });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form["email", "password"] == "") {
            toast.error("All feilds are required.",{
                position: "top-center",
                transition: Bounce,
                closeOnClick: true,
            })
        }
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, form.email, form.password);
            navigate("/")
            setLoading(false);
            toast.success("You have Successfully logged in",{
                position: "top-center",
                transition: Slide,
                closeOnClick: true,
            })

        }catch (error){
            toast.error(error.message, {
                position: "top-center",
                transition: Bounce,
                closeOnClick: true,
            });
            setLoading(false);
        }
    }
  return (
    <div className=' size mt-[6rem] text-center'>
        <h2 className=' text-3xl font-Playfair'>Sign in with email </h2>
        <p className=' w-full sm:w-[25rem] mx-auto py-[3rem] font-normal'>
            Enter your email address to create an account.
        </p>

        <form 
            onSubmit={handleSubmit} className=' flex flex-col gap-4'>
            <Input form={form} setForm={setForm} type="email" title="email"/>
            <Input form={form} setForm={setForm} type="password" title="password"/>
            <button 
                className={` px-4 py-1 text-sm rounded-full bg-green-500 hover:bg-green-700 
                text-white w-fit mx-auto ${loading ? "opacity-50 pointer-events-none" : "" }`}>
                Continue
            </button>
            <button 
                onClick={()=> setSignReq("")}
                className=' mt-5 text-md text-green-500 hover:text-green-700 flex items-center justify-center mx-auto'>
                <MdKeyboardDoubleArrowLeft/>
                All sign in options
            </button>
        </form>
    </div>
  )
}

export default SignIn;