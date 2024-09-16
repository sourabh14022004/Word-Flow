import React, { useState } from 'react'
import Model from '../../../Utils/Model.jsx';
import { LiaTimesSolid } from "react-icons/lia"; 
// import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
// import { IoMailOutline } from "react-icons/io5";
// import { FiMail } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import { signInWithPopup } from 'firebase/auth';
import { auth,  db,  provider } from '../../../Firebase/firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Auth = ({model, setModel}) => {
    const [createUser, setCreateUser] = useState(false);
    const [signReq, setSignReq] = useState("");
    const navigate =  useNavigate();

//  google auth function...

const googleAuth = async () => {
    try {
      const createUser = await signInWithPopup(auth, provider);
      const newUser = createUser.user;

      const ref = doc(db, "users", newUser.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: "",
        });
        navigate("/");
        toast.success("User have been Signed in");
        setModel(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <Model model = {model} setModel ={setModel}>
        <section 
            className={`flex items-center justify-center z-50 fixed top-0 lg:top-[3.125rem] 
                        bottom-0 lg:bottom-[3.125rem]  left-0 md:left-[10rem] overflow-auto 
                        right-0 md:right-[10rem] bg-white shadows rounded-lg 
                        ${model ? "visible opacity-100" : "invisible opacity-0"}
                        transition-all duration-500
                        `}>

            <button 
                onClick={() => setModel(false)}
                className={`absolute top-8 right-8 text-2xl hover:opacity-50`}>
                <LiaTimesSolid/>
            </button>

            <div className=' flex flex-col justify-center items-center gap-4 h-[500px] w-[450px]'>
                {signReq === "" ? (
                    <>
                        <div>
                            <h2 className='text-2xl font-Playfair'>
                                {createUser ? "Join Wold  flow" : "Welcome back"}
                            </h2>
                        </div>
                    
                        <div className=' flex flex-col gap-3 w-fit mx-auto pt-20 pb-4'>
                            <Button 
                                click = {googleAuth}
                                icon = {<FcGoogle className=' text-2xl'/>} 
                                text = {`${createUser ? "Sign up" : "Sign in"} with Google`}/>
                            <Button
                                click={() => console.log("Facebook auth not implemented yet")} // Auth not added
                                icon = {<MdFacebook className=' text-2xl text-blue-600'/>} 
                                text = {`${createUser ? "Sign up" : "Sign in"} with Facebook`}/>
                            <Button 
                                click={() => setSignReq(createUser ? "sign-up" : "sign-in")}
                                icon = {<CiMail className=' text-2xl'/>} 
                                text = {`${createUser ? "Sign up" : "Sign in"} with email`}/>
                        </div>

                        <div className=' flex  items-center justify-center mb-9'>
                            <p>{createUser ? "Already have an account?" : "No Account?"}</p>
                            <button 
                                // onClick={() => setCreateUser(!createUser)}
                                onClick={() => setCreateUser(!createUser)} 
                                className=' text-green-600 hover:text-green-800 poppins-semibold'>
                                    {createUser ? "Sign in":"Create one"}
                            </button>
                        </div> 
                    </>

                ) : signReq === "sign-in" ? ( 
                    <SignIn setModel={setModel}  setSignReq ={setSignReq}/>
                ) : signReq === "sign-up" ? (
                    <SignUp setModel={setModel} setSignReq ={setSignReq}/>
                ) : null}

                    <div className=' flext flex-col items-center text-center justify-center text-[12px] pt-[25px]'>
                        <p>Click “Sign in” to agree to Medium’s <span/>
                             <span className='underline underline-offset-1'>Terms of Service</span> <span></span>
                            and acknowledge that Medium’s <span></span>
                            <span className=' underline underline-offset-0'>Privacy Policy</span>  <span></span>
                            applies to you.
                        </p>            
                    </div>
            </div>
        </section>
    </Model>
  );
};

export default Auth;

const Button = ({ icon, text, click}) => {
    return (
        <button 
            onClick={click}
            className=' flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full'>
            {icon}
            {text}
        </button>
    )
}