import React from 'react'
import { FaDownload } from "react-icons/fa6";

const SavedPost = ({ post  }) => {
  return (
    <>
        <button className=' hover:text-green-600'>
        <FaDownload className=' text-xl pointer-events-none'/>
        </button>
    </>
)
  
}

export default SavedPost;