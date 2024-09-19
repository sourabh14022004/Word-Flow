import React, { useState } from 'react'
import { CgOptions } from "react-icons/cg";
import DropDown from '../../../../Utils/DropDown';

const Actions = () => {
    const [showDrop, setShowDrop] = useState(false);
    const handleClick = () => {
        setShowDrop(!showDrop);
      };
  return (
    <div className="relative">
        <button 
            onClick={handleClick}
            className='py-2'>
            <CgOptions className="text-2xl hover:opacity-40" />
        </button>
        <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size=" w-[7rem]">
        <Button click="" title="Edit Story" />
        <Button click="" title="Delete Story" />
      </DropDown>
    </div>
  )
}

export default Actions;

const Button = ({ click, title }) => {
    return (
      <button
        onClick={click}
        className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left
      ${title === "Delete Story" ? "text-red-600" : ""}
      `}>
        {title}
      </button>
    );
  };