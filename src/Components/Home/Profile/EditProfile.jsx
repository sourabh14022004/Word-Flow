import React, { useEffect, useRef, useState } from 'react'
import Model from '../../../Utils/Model';
import { IoExitOutline } from "react-icons/io5"
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = ({editModal, setEditModal, getUserData}) => {

  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    userImg: "",
    bio: "",
  });

  const openFile = () => {
    imgRef.current.click();
  }

// if there is data inside our database
   useEffect(() => {
    if (getUserData) {
      setForm(getUserData);
    } else {
      setForm({ username: "", bio: "", userImg: "" });
    }
  }, [getUserData]);


// save form 
  const saveForm = async () => {
    if (form["username"] === "" || form["bio"] === "") {
      toast.error("All inputs are required!!!");
      return;
    }
    setLoading(true);
    
      // let imageUrl = form.userImg;
    
      // // If user uploads a new image
      // if (form.userImg && form.userImg instanceof File) {
      //   try {
      //     const storageRef = ref(storage, `image/${form.userImg.name}`);
      //     await uploadBytes(storageRef, form.userImg);
      //     imageUrl = await getDownloadURL(storageRef);
      //   } catch (error) {
      //     toast.error("Failed to upload image");
      //     setLoading(false);
      //     return;
      //   }
      // }

    const storageRef = ref(storage, `image/${form.userImg.name}`);
    await uploadBytes(storageRef, form?.userImg);


    const imageUrl = await getDownloadURL(storageRef);
  
  try {
    const docRef = doc(db, "users", getUserData?.userId);
    await updateDoc(docRef, {
      bio: form.bio,
      username: form.username,
      userImg: imgUrl ? imageUrl : form.userImg,
      userId: getUserData?.userId,
    });
    setLoading(false);
    setEditModal(false);
    toast.success("Profile has been updated");
  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <Model model= {editModal} setModel = {setEditModal} >
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows
        my-[1rem] z-20 mb-[3rem] p-[2rem] rounded-[10px]">
          {/* head  */}
          <div className="flex items-center justify-between">
             <h2 className="font-bold text-xl">Profile information</h2>
             <button onClick={() => setEditModal(false)} className='text-xl'>
              <IoExitOutline/>
              </button>
          </div>
          {/* body */}
          <section className="mt-6">
          <p className="pb-3 text-sm text-gray-500">Photo</p>
            <div className="flex gap-[2rem]">
              <div className="w-[5rem]">
                <img className="min-h-[5rem] min-w-[5rem] object-cover border border-gray-400 rounded-full" 
                  src={imgUrl ? imgUrl : form.userImg ? form.userImg : '/src/assets/profile.jpg'} 
                  alt='proflie-img'>
                </img>
                <input 
                  onChange={(e) => {
                    setImgUrl(URL.createObjectURL(e.target.files[0]));
                    setForm({...form, userImg : e.target.files[0]});
                  }}
                  accept="image/jpg, image/png, image/jpeg" 
                  ref={imgRef} type="file" 
                  hidden />
              </div>
              <div>
                <div className=' flex gap-4 text-sm'>
                  <button onClick={openFile} className="text-green-600">Update</button>
                  <button className="text-red-600">Remove</button>
                </div>
                  <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                    Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
                    side.
                  </p>
              </div>
          </div>
          </section>
          {/* profile edit form */}
          <section className="pt-[1rem] text-sm">
            <label className=' pb-3 block' htmlFor="">
              Name*
            </label>
            <input 
              onChange={(e) => setForm({...form, username : e.target.value})}
              value={form.username}
              className=' p-1 border-b border-black outline-none w-full' 
              type="text" 
              placeholder='username...' 
              maxLength={50}
            />
              <p className="text-sm text-gray-600 pt-2">
                Appears on your Profile page, as your byline, and in your responses. {form.username.length}/50
              </p>
            <section className=' pt-[1rem] text-sm'>
                <label className=' pb-3 block' htmlFor="">
                  Boi*
                </label>
                <input 
                  onChange={(e) => setForm({...form, bio : e.target.value})}
                  value={form.bio}
                  className=' p-1 border-b border-black outline-none w-full' 
                  type="text" 
                  placeholder='bio...' 
                  maxLength={160}
                />
                  <p className="text-sm text-gray-600 pt-2">
                    Appears on your Profile page and next to your stories. {form.bio.length}/160
                  </p>
            </section>
          </section>
          {/* footer */}
          <div className=' flex items-center justify-end gap-4 pt-[2rem]'>
            <button 
                  onClick={() => setEditModal(false)}
                  className=' border border-green-600 py-2 px-5 rounded-full text-green-600'>
                  Cancel
            </button>
            <button 
                onClick={saveForm} 
                className='border border-black py-2 px-6 rounded-full text-white bg-green-800'>
                  Save
            </button>
          </div>
        </div>
    </Model>
  )
}

export default EditProfile;

