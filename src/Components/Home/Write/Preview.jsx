import React, { useEffect, useReducer, useRef, useState } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from '../../../Context/Context';
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import TagsInput from 'react-tagsinput';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../../Firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Bounce, Slide, toast } from 'react-toastify';

const Preview = ({setPublish, description, title}) => {
    const imageRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [desc, setDesc] = useState("");
    const { currentUser } = Blog();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState({
        title: "",
        photo: "",
      });
    
    useEffect(() => {
        if (title || description) {
            setPreview({ ...preview, title: title });
            setDesc(description);
          } else {
            setPreview({ ...preview, title: "" });
            setDesc("");
          }
    },[title, description])

    const handleClick = () => {
    imageRef.current.click();
    };
      
  const handleSubmit = async () => {
        setLoading(true);
        try {
          if (preview.title === "" || desc === "" || tags.length === 0) {
            toast.error("All fields are required!!!", {
              position: "top-center",
              transition: Bounce,
              closeOnClick: true,
            });
            return;
          }
    
          if (preview.title.length < 15) {
            toast.error("Title must be at least 15 letters" ,{
              position: "top-center",
              transition: Bounce,
              closeOnClick: true,
            });
            return;
          }
    
          const collections = collection(db, "posts");
          
          let url;

          if(imageUrl) {
            const storageRef = ref(storage, `image/${preview.photo.name}`);
            await uploadBytes(storageRef, preview?.photo);
            url = await getDownloadURL(storageRef);
          }
        
        await addDoc(collections, {
            userId: currentUser?.uid,
            title: preview.title,
            desc,
            tags,
            postImg: url ||  "",
            created: Date.now(),
            pageViews: 0,
          });
          toast.success("Post has been added", {
            position: "top-center",
            transition: Slide,
            closeOnClick: true,
          });
          navigate("/");
          setPublish(false);
          setPreview({
            title: "",
            photo: "",
          });
        } catch (error) {
          toast.error(error.message,{
            position: "top-center",
            transition: Bounce,
            closeOnClick: true,
          });
        } finally {
          setLoading(false);
        }
      };
  return (
    <section className="absolute inset-0 bg-white z-30">
        <div className="size my-[2rem]">
            <span 
                onClick={() => setPublish(false)}
                className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer">
                <LiaTimesSolid />
            </span>
            {/* previewing the text */}
            <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
                <div className="flex-[1]">
                    <h3>Preview</h3>
                    <div 
                        style={{backgroundImage: `url(${imageUrl})`}}
                        onClick={handleClick}
                        className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                        place-items-center cursor-pointer bg-cover bg-no-repeat rounded-[5px] shadows ">
                        {!imageUrl && "Add Image"}
                    </div>
                    <input
                        onChange={(e) => {
                            setImageUrl(URL.createObjectURL(e.target.files[0]));
                            setPreview({ ...preview, photo: e.target.files[0] });
                        }}
                        ref={imageRef}
                        type="file"
                        hidden
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="outline-none w-full border-b border-gray-300 py-2 px-1 Border1"
                        value={preview.title}
                        onChange={(e) =>
                            setPreview({ ...preview, title: e.target.value })
                        }
                    />
                    <ReactQuill 
                        theme="bubble" 
                        value={desc} 
                        onChange={setDesc} 
                        placeholder= "Preview your story..."
                        className="py-3 border-b border-gray-300 Border2"
                    />
                    <p className="text-gray-500 pt-4 text-sm">
                        <span className="font-bold">Note:</span> Changes here will affect
                        how your story appears in public places like Your’s homepage and
                        in subscribers’ inboxes — not the contents of the story itself.
                    </p>
                </div>
                <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
                    <h3 className="text-2xl">
                        Publishing to:
                        <span className="font-bold capitalize">Readers worldwide on Word Flow.</span>
                    </h3>
                    <p>
                        Press Enter to Add tags or change topics up to 5 so readers know what your story is
                        about.
                    </p>
                    <TagsInput value={tags} onChange={setTags} />
                    <button
                        onClick={handleSubmit}
                        className={`btn !bg-green-700 !w-fit !py-2 !px-3 !text-white !rounded-full !text-md transition !duration-500 !shadow-lg transform hover:-translate-y-1 hover:scale-110  ${loading ? ' !border-emerald-400 border-2':' !border-black border-2'}`}>
                            {loading ? "Submitting" : "Publish now"}
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Preview