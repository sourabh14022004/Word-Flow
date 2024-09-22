import React, { useState } from 'react'
import Input from '../../../Utils/Input';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../Firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';




const SignUp = ({ setSignReq, setModel }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form,setForm] = useState({
        username : "",
        email : "",
        password : "",
        rePassword : "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form[("username","email","password","rePassword")] === "" ) {
            toast.error("All fields are required")
        } else if (form["password"] !== form["rePassword"]) {
            toast.error("Your password are not matching!!");
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
                    userImg: "",
                    bio: "",
                    created : Date.now(),

                });
                navigate("/");
                toast.success("Users has been Signed in Successfully.");
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
            <Input form = {form} setForm={setForm} type="password" title="rePassword"/>
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