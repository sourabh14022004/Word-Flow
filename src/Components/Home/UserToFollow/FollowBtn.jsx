import React, { useEffect, useState } from 'react'
import { Blog } from '../../../Context/Context';
import { db } from '../../../Firebase/firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import useSingleFetch from '../../hooks/useSingleFetch';
import { useLocation } from 'react-router-dom';

const FollowBtn = ({ userId, username }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { currentUser } = Blog();

    const {data, loading} = useSingleFetch(
        "users", 
        currentUser?.uid, 
        "follows");
    
    useEffect(() => {
        setIsFollowed(data && data?.findIndex((item) => item.id === userId) !== -1);
    }, [data]);

    const handleFollow = async () => {
        try {
            if (currentUser) {
                const followRef = doc(db, "users", currentUser?.uid, "follows", userId);
                const followersRef = doc(db, "users", userId, "followers", currentUser?.uid);
                if (isFollowed) {
                    await deleteDoc(followRef);
                    await deleteDoc(followersRef);
                    toast.success(`You have Unfollowed ${username}`)
                } else {
                    await setDoc(followRef, {
                        userId : userId,
                    });
                    await setDoc(followersRef, {
                        userId : userId,
                    });
                    toast.success(`You have Followed ${username}`)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
     };

    return (
    <>
    
        <button 
            onClick={handleFollow}
            className={` relative flex px-3 py-[0.2rem] rounded-lg items-center justify-center overflow-hidden ${isFollowed ? 'bg-gray-500 text-white' : "bg-gray-800 text-white px-[22.7px]"}  shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-green-600 before:duration-500 before:ease-out hover:shadow-green-600 hover:before:h-56 hover:before:w-56`}>
            <span className="relative z-10 text-md">{isFollowed ? "Following" : "Follow"}</span>
        </button>
            
    </>
  )
}

export default FollowBtn;