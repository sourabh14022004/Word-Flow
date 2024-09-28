
import React, { useState } from 'react'
import Input from '../../../Utils/Input';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Bounce, Slide, toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../Firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import profile from "../../../assets/profile.jpg";




const SignUp = ({ setSignReq, setModel }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form,setForm] = useState({
        username : "",
        email : "",
        password : "",
        rePassword : "",
    });
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form[("username","email","password","Enter your password again")] === "" ) {
            toast.error("All fields are required", {
                transition: Bounce,
                position: "top-center",
                closeOnClick: true,
            })
        } else if (!emailRegex.test(form["email"])) {
            // Check if email format is valid
            toast.error("Please enter a valid email address",{
                transition: Bounce,
                position: "top-center",
                closeOnClick: true,
            });
            return;
        } else if (form["password"] !== form["Enter your password again"]) {
            toast.error("Your password are not matching!!", {
                transition: Bounce,
                position: "top-center",
                closeOnClick: true,
            });
            return;
        } else if (form["Enter your password again"].length && form["password"].length < 6) {
            toast.error("Password must be at least 6 digits.",{
                transition: Bounce,
                position: "top-center",
                closeOnClick: true,
            })
            return;
        } else {
            setLoading(true);
            const { user } = await createUserWithEmailAndPassword(
                auth, 
                form.email, 
                form.password
            );

            const ref = doc(db, "users", user.uid);
            const userDoc = await getDoc(ref);

            if(!userDoc.exists()) {
                await setDoc(ref, {
                    userId: user.uid,
                    username: form.username,
                    email: form.email,
                    userImg: profile,
                    bio: "",
                    created : new Date(),

                });
                navigate("/");
                toast.success("Users has been Signed in Successfully.",{
                    transition: Slide,
                    position: "top-center",
                    closeOnClick: true,
                });
                setModel(false);
                setLoading(false);
            }
            
        };
    }


  return (
    <div className=' size mt-[6rem] text-center'>
        <h2 className=' text-3xl font-Playfair'>Sign up with email </h2>
        <p className=' w-full sm:w-[25rem] mx-auto py-[3rem] font-normal'>
            Enter your email address to create an account.
        </p>

        <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
            <Input form = {form} setForm={setForm} type="text" title="username"/>
            <Input form = {form} setForm={setForm} type="email" title="email"/>
            <Input form = {form} setForm={setForm} type="password" title="password"/>
            <Input form = {form} setForm={setForm} type="password" title="Enter your password again"/>
            <button 
                className={` px-4 py-1 text-sm rounded-full bg-green-500 hover:bg-green-700 
                text-white w-fit mx-auto ${loading ? "opacity-50 pointer-events-none" : "" }`}>
                Continue
            </button>
            <button 
                onClick={()=> setSignReq("")}
                className=' mt-5 px-6 text-md text-green-500 hover:text-green-700 flex items-center justify-center mx-auto'>
                <MdKeyboardDoubleArrowLeft/>
                All sign up options
            </button>

        </form>
    </div>
  )
}

export default SignUp;
