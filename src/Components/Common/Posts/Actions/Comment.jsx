import React from 'react'
import { FaComment } from "react-icons/fa";


const Comment = () => {
  return (
    <button className=' flex items-center gap-1 text-lg'>
        <FaComment className=' text-lg text-gray-500'/>
        <span>12</span>
    </button>
  )
}

export default Comment;