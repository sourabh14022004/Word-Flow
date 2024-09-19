import React, { useEffect, useState } from 'react'
import { FaDownload } from "react-icons/fa6";
import { Blog } from '../../../../Context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../Firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/useSingleFetch';

const SavedPost = ({ post }) => {
    const [isSaved, setIsSaved] = useState(false);
    const { currentUser } = Blog();
    const {data, loading} = useSingleFetch(
        "users", 
        currentUser?.uid, 
        "savePost");
    
    useEffect(() => {
        setIsSaved(data && data.find((item) => item.id  === post.id))
    }, [data, post?.id]);

    const handleSave = async () => {
        try {
            if (currentUser) {
                const saveRef = doc(
                    db,
                    "users",
                    currentUser?.uid,
                    "savePost",
                    post?.id
                  );
                  if (isSaved) {
                    await deleteDoc(saveRef)
                    toast.success("Post has been unsaved")
                } else {
                    await setDoc(saveRef, {
                        ...post,
                    });
                    toast.success("Post has been Saved")
                }
            }
        } catch (error){}
    };
  return (
    <>
        <button 
            onClick={handleSave}
            className=' text-cyan-500 hover:text-red-400'>
        <FaDownload 
            className={` text-xl pointer-events-none
                ${isSaved ? " text-green-600" : ""}`}/>
        </button>
    </>
)
  
}

export default SavedPost;