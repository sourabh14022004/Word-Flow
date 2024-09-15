import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import Model from '../../../Utils/Model';

const Search = ( {model, setModel}) => {
  return (
    <>
      <Model model={model} setModel={setModel}>
        <div className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0
          ${
            model
              ? "visible opacity-100"
              : "invisible sm:visible sm:opacity-100 opacity-0"
          }
          transition-all duration-100`}>
          <div className=' flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10'>
            <span className=' text-xl text-gray-400'>
              <BsSearch/>
            </span>
            <input 
              className=' bg-transparent outline-none py-[0.7rem] px-3 text-md w-full' 
              type="text" 
              placeholder='Search Flow'/>
          </div>
        </div>
      </Model>
    </>
  )
}

export default Search;