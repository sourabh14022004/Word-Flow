import React from 'react'
import Input from '../../../Utils/Input';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";




const SignIn = ({ setSignReq }) => {
  return (
    <div className=' size mt-[6rem] text-center'>
        <h2 className=' text-3xl font-Playfair'>Sign in with email </h2>
        <p className=' w-full sm:w-[25rem] mx-auto py-[3rem] font-normal'>
            Enter your email address to create an account.
        </p>

        <form className=' flex flex-col gap-4'>
            <Input type="email" title="email"/>
            <Input type="password" title="password"/>
            <button 
                className=' px-4 py-1 text-sm rounded-full bg-green-500 hover:bg-green-700 
                text-white w-fit mx-auto'>
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