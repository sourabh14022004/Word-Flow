import React from 'react'
import { Blog } from '../../../../Context/Context';

const ProfileAbout = ({ getUserData, setEditModal }) => {

  const { currentUser } = Blog();
  return <div className=' w-full'>
      <p className=' text-xl first-letter:uppercase text-gray-500'>
        {getUserData?.bio || "Hey " + getUserData?.username + " it's seems you don't set your bio till now."}
      </p>
      <div className=' text-right'>
        { currentUser?.uid === getUserData.userId &&   (
          <button 
          onClick={() => setEditModal(true)}
          className=' border-black border py-2 px-5 rounded-full text-black mt-[3rem]'>
            Edit
        </button>
      )}
      </div>
    </div>
  
}

export default ProfileAbout;