import React, { useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import wordflow from '../../../assets/word-flow-crop.png';
import Search from './Search';
import profile from "../../../assets/profile.jpg";
import Model from '../../../Utils/Model.jsx';
import UserModel from './UserModel.jsx';
import { BsSearch } from "react-icons/bs";
import { Blog } from '../../../Context/Context.jsx';
import Loading from '../../Loading/Loading.jsx';
import { LiaEditSolid } from 'react-icons/lia';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase.js';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';

const HomeHeader = () => {
  // const [editPost, setEditpath] = useState(true);
  const { allUsers, userLoading, currentUser, setPublish, updateData, title, description } = Blog();
  const [model, setModel] = useState(false);
  const [searchModel, setSearchModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate(null);
  const getUserData = allUsers.find((user) => user.id === currentUser?.uid);

  const editPath = pathname.split("/")[1];
  const postId = pathname.split("/")[2];

  const handleEdit = async () => {
    try {
      setLoading(true);
      const ref = doc(db, "posts", postId);
      await updateDoc(ref, {
        title,
        desc : description,
      });
      navigate(`/post/${postId}`);
      toast.success("Post has been updated",{
        position: "top-center",
        transition: Slide,
        closeOnClick: true, 
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const showtoast =() => {
    toast.info("Hang in there! We're perfecting this functionality for you! 😇", {
      position:'top-center',
      autoClose: 5000, 
      transition: Slide, 
      closeOnClick: true,
      theme:"light",
    })
  }
  return (
    <header className=' border-b border-gray-200'>
      {userLoading && <Loading />}
      <div className=' size h-[60px] flex items-center justify-between'>
        {/* left side */}
        <div className=' flex items-center gap-3'>
          <Link to={"/"}>
            <span className=' text-5xl'>
              <img
                className=' h-[3rem] rounded-full'
                src={wordflow}
                alt='logo is fetching please wait...'
              />
            </span>
          </Link>
          <Search model={searchModel} setModel={setSearchModel} />
        </div>



        {/* Right side */}
        <div className=' flex items-center gap-3 sm:gap-7'>
          <span
            onClick={() => setSearchModel(true)}
            className=' flex sm:hidden text-2xl text-gray-300 cursor-pointer'>
            <BsSearch />
          </span>


{/* write section */}
          {pathname === "/write" ? (
            <button
              onClick={() => setPublish(true)}
              className="btn !bg-green-700 !py-2 !px-4 !text-white !rounded-full !text-[18px]">
              Publish
            </button>
          )  : editPath  === "editPost" ? (
          <button 
            onClick={handleEdit}
            className={` btn !bg-green-700 !py-2 !text-white !rounded-full 
            ${loading ? " opacity-40" : ""}`}>
              {loading ? "Updating..." : "Save and Update"}
          </button>
          ) : (
            <Link
              to="/write"
              className="hidden md:flex items-center gap-1 text-gray-500">
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="text-sm mt-2">Write</span>
            </Link>
          )
          }


          <div>
          <span className=' text-3xl text-gray-500 cursor-pointer'>
            <IoNotificationsOutline onClick={showtoast}/>
          </span>
          <ToastContainer limit={5}/>
          </div>
          <div className=' flex items-center relative'>
            <img
              onClick={() => setModel(true)}
              className=' w-[2.3rem] h-[2.3rem] object-cover cursor-pointer rounded-full'
              src={getUserData?.userImg ? getUserData?.userImg : profile}
              alt='profile-img'>
            </img>
            <span
              className=' text-gray-500 cursor-pointer'>
              <MdKeyboardArrowDown onClick={() => setModel(true)} />
            </span>
            <Model model={model} setModel={setModel}>
              <div className={`${model ? "visible opacity-100%" : "invisible opacity-0"} transition-all duration-200 `}>
                <UserModel setModel={setModel} />
              </div>
            </Model>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HomeHeader;