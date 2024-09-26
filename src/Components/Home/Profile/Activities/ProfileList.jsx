import React from 'react'
import useSingleFetch from '../../../hooks/useSingleFetch';
import { Blog } from '../../../../Context/Context';
import Loading from '../../../Loading/Loading';
import PostsCard from '../../../Common/Posts/PostsCard';
import { BsShieldLock } from "react-icons/bs";

const ProfileList = ({ getUserData }) => {
  const { currentUser } = Blog();
  const {data, loading} = useSingleFetch(
    "users", 
    currentUser?.uid, 
    "savePost");
  return (
    <div>
      { currentUser && currentUser?.uid === getUserData?.userId ? (
        <div className=' flex flex-col gap-[2rem] mb-[2rem]'>
          {data.length === 0 && (
            <p 
              className=' text-gray-500 '>
                <span className=' capitalize mr-1'>{ getUserData?.username}</span> 
                has no saved post.</p>
          )}
          {loading ? <Loading/> : (data?.map((post,i) =>  <PostsCard post={post} key={i} /> ))}
        </div>
      ) : (
        <PrivateLists username={getUserData?.username}/>
      )} 
    </div>
  )
}

export default ProfileList;

const PrivateLists = ({ username }) => {
  return (
    <div className=' flex flex-col justify-center items-center gap-[3rem] text-center'>
      <p> 
        <span className=' capitalize'> { username } saved posts are private</span> 
      </p>
      <span className='text-[9rem] text-gray-500'>
        <BsShieldLock />
      </span>
    </div>
  )
}