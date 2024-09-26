import React, { useEffect, useState } from 'react'
import { Blog } from '../../../../Context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../Firebase/firebase';
import { Slide, toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/useSingleFetch';
import { PiHandHeartFill } from "react-icons/pi";
import { formatNum } from '../../../../Utils/helper';


const Like = ({ postId } ) => {
    const [isLiked, setIsLiked] = useState(false);
    const {currentUser, setAuthModel} = Blog();

    const {data} = useSingleFetch("posts", postId, "likes");

    useEffect(() => {
        setIsLiked(
          data && data.findIndex((item) => item.id === currentUser?.uid) !== -1
        );
      }, [data]);

      const handleLike = async () => {
        try {
          if (currentUser) {
            const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
            if (isLiked) {
              await deleteDoc(likeRef);
            } else {
              await setDoc(likeRef, {
                userId: currentUser?.uid,
              });
            }
          } else {
            setAuthModel(true);
          }
        } catch (error) {
          toast.error(error.message,{
            position:"top-center",
            transition: Slide,
            closeOnClick: true,
          });
        }
      };

  return (
    <button 
        onClick={handleLike}
        className=' flex items-center gap-1 text-lg'>
        <PiHandHeartFill className={` text-xl ${isLiked ? " text-red-500" : " text-gray-500"}`}/>
        <span>{formatNum(data?.length)}</span>
    </button>
  )
}

export default Like;