import React, { useState } from 'react'
import ProfileHome from './Activities/ProfileHome.jsx';
import ProfileLists from './Activities/ProfileList.jsx';
import ProfileAbout from './Activities/ProfileAbout.jsx';
import Model from '../../../Utils/Model.jsx';
import { IoExitOutline } from "react-icons/io5";
import { discoverActions } from '../../../data.js';
import { IoSettingsSharp } from "react-icons/io5";
import EditProfile from './EditProfile.jsx';
import { Blog } from '../../../Context/Context.jsx';
import { useParams } from 'react-router-dom';
import profileImg from '../../../assets/profile.jpg'
import useSingleFetch from '../../hooks/useSingleFetch.jsx';



const Profile = () => {
  const { allUsers } = Blog();
  const { userId } = useParams();
  const activities = [
    {
      title: "Home",
      comp: ProfileHome,
    },
    {
      title: "Lists",
      comp: ProfileLists,
    },
    {
      title: "About",
      comp: ProfileAbout,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [model, setModel] = useState (false);
  const [editModal, setEditModal] = useState(false);

  const getUserData = allUsers.find((user) => user.id === userId);


  // geting follows and followers data.
  const { data: follows } = useSingleFetch("users", userId, "follows");
  const { data: followers } = useSingleFetch("users", userId, "followers");
  const { currentUser } = Blog();


  return (
    <section className='size flex gap-[4rem] relative'>
      {/* Users activity */}
      <div className=' mt-[9rem] flex-[2]'>
        <div className=' flex items-end gap-4'>
          <h2 className='text-3xl sm:text-5xl font-bold capitalize'>
            { getUserData ?.username}
          </h2>
          <p className=' text-gray-500 text-sm sm:text-sm capitalize'> Followers({followers.length})</p>
          <p className=' text-gray-500 text-sm sm:text-sm capitalize'> Followings({follows.length})</p>
        </div>
        <div className=' flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]'>
          {activities.map((item, i) => (
            <div 
              key={i}
              className= {`py-[0.5rem] 
              ${item.title == currentActive.title ? " border-b border-gray-500" : ""}`}>
              <button 
                onClick={() => setCurrentActive(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp 
            getUserData = {getUserData}
            setEditModal ={setEditModal}/>
      </div>
      {/* button to open the side bar  */}
      <button 
        onClick={() => setModel(true)}
        className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white
        grid place-items-center md:hidden">
            <IoSettingsSharp/>
        </button>
      {/* users details */}
      <Model model={model} setModel={setModel}>
      <div 
        className={`flex-[1] border-l border-gray-300 p-[2rem] z-10
          fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:sticky
          ${model ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}
          transition-all duration-500`}>
          {/* icon to close out model */}
        <div className=' pb-4 text-right'>
          <button 
            onClick={() =>setModel(false)}
            className="inline-block md:hidden">
            <IoExitOutline/>
          </button>
        </div>
        {/* profile details */} 
        <div className="sticky top-7 flex flex-col justify-between">
          <img 
            className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
            src={getUserData?.userImg ||`${profileImg}`} alt='profile-img'></img>
          <h2 className="py-2 font-bold capitalize">{getUserData?.username}</h2>
          <p className="text-gray-500 first-letter:uppercase text-sm">{getUserData?.bio}</p>
          { currentUser?.uid === getUserData?.userId  && (
            <button
                onClick={() => setEditModal(true)}
                className="text-green-700 pt-6 text-sm w-fit">
                Edit Profile
            </button>
        )}
          {/* nav */}
           <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
                {discoverActions.map((item) => (
                <button key={item} className="text-xs text-black1">
                  {item}
                </button>
              ))}
          </div> 

        </div>
      </div>
      </Model> 
      {editModal && <EditProfile 
          getUserData = {getUserData}
          editModal={editModal} 
          setEditModal={setEditModal}/>}
    </section>
  )
}

export default Profile;