import React, { useEffect, useState } from 'react'
import { PiHandHeart } from "react-icons/pi";
import { Blog } from '../../../../Context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../Firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/useSingleFetch';
import { PiHandHeartFill } from "react-icons/pi";
import { formatNum } from '../../../../Utils/helper';


const Like = ( {post, postId} ) => {
    const [isLiked, setIsLiked] = useState(false);
    const {currentUser} = Blog();

    const {data} = useSingleFetch("posts", postId, "likes");

    useEffect(() => {
        setIsLiked(
          data && data.findIndex((item) => item.id === currentUser?.uid) !== -1
        );
      }, [data]);



    const handleLike  = async () => {
        try {
            if(currentUser) {
                const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
                if (isLiked) {
                    await deleteDoc(likeRef)
                }  else {
                    await setDoc(likeRef, {
                        useId: currentUser?.uid,
                    }) 
                }

            }
        } catch (error) {
            toast.error(error.message);
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