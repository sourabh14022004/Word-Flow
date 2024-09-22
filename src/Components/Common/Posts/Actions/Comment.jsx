import React from 'react'
import { FaComment } from "react-icons/fa";
import { Blog } from '../../../../Context/Context';
import { formatNum } from '../../../../Utils/helper';


const Comment = () => {
    const { setShowComment, commentLength } = Blog();
  return (
    <button 
        onClick={() => setShowComment(true)}
        className=' flex items-center gap-1 text-lg'>
        <FaComment className=' text-lg text-gray-500'/>
        <span>{formatNum(commentLength)}</span>
    </button>
  )
}

export default Comment;