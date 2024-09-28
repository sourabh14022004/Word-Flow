import React, { useState } from 'react'
import { SlOptions } from "react-icons/sl";
import DropDown from '../../../../Utils/DropDown';
import { Blog } from '../../../../Context/Context';
import { deleteDoc, doc } from 'firebase/firestore';
import { Bounce, Slide, toast } from 'react-toastify';
import { db } from '../../../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Actions = ({ postId, title, desc }) => {
    const [showDrop, setShowDrop] = useState(false);
    const { setUpdateData, currentUser } = Blog();
    const handleClick = () => {
        setShowDrop(!showDrop);
      };

      const handleEdit = () => {
        navigate(`/editPost/${postId}`);
        setUpdateData({ title, description: desc });
      };


      const handleRemove = async () => {
        try {
          const ref = doc(db, "posts", postId);
          const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
          const commentRef = doc(db, "posts", postId, "comments", currentUser?.uid);
          const savedPostRef = doc(db, "users", currentUser?.uid, "savedPost", postId );
          await deleteDoc(ref);
          await deleteDoc(likeRef);
          await deleteDoc(commentRef);
          await deleteDoc(savedPostRef);
    
          toast.success("post has been removed",{
            position: "top-center",
            transition: Slide,
            closeOnClick: true,
          });
          setShowDrop(false);
          navigate("/");
        } catch (error) {
          toast.success(error.message,{
            transition: Slide,
            position: "top-center",
            closeOnClick: true,
          });
        }
      };
      const navigate = useNavigate(null);
  return (
    <div className="relative">
        <button 
            onClick={handleClick}
            className='py-2'>
            <SlOptions className="text-2xl hover:opacity-40" />
        </button>
        <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size=" w-[7rem]">
        <Button click= {handleEdit} title="Edit Story" />
        <Button click={handleRemove} title="Delete Story" />
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