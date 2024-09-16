import React from 'react'

const ProfileAbout = ({ getUserData, setEditModal }) => {
  return <div className=' w-full'>
      <p className=' text-2xl first-letter:uppercase'>
        {getUserData?.bio || "Hey " + getUserData?.username + " it's seems you don't set your bio till now."}
      </p>
      <div className=' text-right'>
        <button 
          onClick={() => setEditModal(true)}
          className=' border-black border py-2 px-5 rounded-full text-black mt-[3rem]'>Edit</button>
      </div>
    </div>
  
}

export default ProfileAbout;