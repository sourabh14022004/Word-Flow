// import React, { useEffect } from 'react'
// import { LiaTimesSolid } from "react-icons/lia";
// import { useNavigate } from 'react-router-dom';

// const UnderConstractionPage = () => {
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // Use the effect to trigger navigation
//   //   const timer = setTimeout(() => {
//   //     navigate('/demo');  // Replace '/somewhere' with your desired path
//   //   }, 3000);  // Delay before navigation, you can change this value

//   //   return () => clearTimeout(timer); // Clean up the timeout if the component unmounts
//   // }, [navigate]);
//   return (
//       <section 
//         className={`flex items-center justify-center z-50 fixed top-0 lg:top-[3.125rem] 
//                     bottom-0 lg:bottom-[3.125rem]  left-0 md:left-[10rem] overflow-auto 
//                     right-0 md:right-[10rem] bg-white shadows rounded-lg
//                     transition-all duration-500
//                   `}>
//             <button 
//                 onClick={() => navigate('/demo')}
//                 className={`absolute top-8 right-8 text-2xl hover:opacity-50`}>
//                 <LiaTimesSolid/>
//             </button>
//           <div className=' flex flex-col justify-center items-center gap-4 h-[500px] w-[450px]'>
//                 <h1>sdfghj</h1>
//           </div>
//       </section>
//   )
// }

// export default UnderConstractionPage;
import React from 'react';
import { FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const UnderConstractionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-indigo-500 text-white text-center">
      {/* Cool animated avatar */}
      <div className="mb-8 animate-spin-slow">
        <FaTools className="text-6xl" />
      </div>
      <h1 className="text-3xl font-bold mb-4">We're working hard to bring you something awesome!</h1>
      <p className="text-lg font-light mb-8">This page is under development.</p>
      {/* Ghost Button */}
      <button
        className="px-6 py-2 border-2 border-indigo-400 text-indigo-400 rounded-full hover:bg-indigo-400 hover:text-white transition-transform transform hover:scale-110"
        onClick={() => window.location.href = '/'}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default UnderConstractionPage;
