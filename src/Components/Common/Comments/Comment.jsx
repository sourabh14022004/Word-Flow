import React, { useState } from 'react'
import { Blog } from '../../../Context/Context';
import profile from '../../../assets/profile.jpg'
import moment from 'moment';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropDown from '../../../Utils/DropDown';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';
import { toast } from 'react-toastify';

const Comment = ( { item: comment, postId}) => {
    const {allUsers, currentUser } = Blog();
    const getUserData = allUsers.find((user) => user.id === comment?.userId); 
    const {userId, commentText, created} = comment;
    const [more, setMore] = useState(false);
    const [drop, setDrop] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editComment, setEditComment] = useState("");


    const removeComment = async () => {
        try {
            const ref = doc(db, "posts", postId, "comments", comment?.id)
            await deleteDoc(ref) 
            setDrop(false);
            toast.success("Comment has been removed")
        } catch (error) {
            toast.success(error.messaeg)
        }
    }
    const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
    setEditComment(commentText);
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
          const ref = doc(db, "posts", postId, "comments", comment.id);
          await updateDoc(ref, {
            commentText: editComment,
            create: Date.now(),
            userId: currentUser?.uid,
          });
          setEditComment("");
          setIsEdit(false);
          setDrop(false);
          toast.success("Comment has been updated");
        } catch (error) {
          toast.success(error.message);
        } finally {
          setLoading(false);
        }
      };


  return (
    <section className="border-b pt-2">
        {!isEdit ? (
            <>
                <div className="flex items-center gap-5">
            <img
                className="w-[2rem] h-[2rem] object-cover rounded-full" 
                src={getUserData?.userImg || (profile)} alt="user-img" />
                <div className="flex-1 flex justify-between">
                    <div>
                        <h2 className="text-sm capitalize">{getUserData?.username}</h2>
                        <p className="text-sm text-gray-400">{moment(created).fromNow()}</p>
                    </div>
                    <div className="relative">
                    {currentUser && currentUser?.uid === userId && (
                        <>
                            <button 
                                onClick={() => setDrop(!drop)}
                                className="text-3xl hover:opacity-50">
                                <BiDotsHorizontalRounded />
                            </button>
                            <DropDown
                                showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
                                <Button click={editCommentText} title="Edit this response"
                                />
                                <Button click={removeComment} title="Delete" />
                            </DropDown>
                        </>
                    )}
                    </div>
                </div>
        </div>
        <p className=' py-3 text-sm'>
            {more ? commentText : commentText.substring(0, 100)}
            {commentText.length > 100 && (
              <button 
                className=' font-bold hover:text-green-700'
                onClick={() => setMore(!more)}>
                {more ? "...less" : "...more"}
                </button>
            )}
        </p>
            </>
        ) : (
            <div className="bg-white shadows p-4 rounded-md">
                <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                placeholder="Write your update text..."
                className="w-full resize-none outline-none text-sm"></textarea>

                <div className="flex items-center justify-end gap-2">
                    <button 
                        onClick = {() => setIsEdit(false)}
                        className="w-fit text-sm">Cancel</button>
                    <button 
                        onClick={handleEdit}
                        className={`btn !text-white !bg-green-700 !rounded-full !text-xs ${ loading ? ' bg-cyan-500':''}`}>
                            {loading ? "Updating..." : "Update" }
                        </button>

                </div>

            </div>
        )}
    </section>
  )
}

export default Comment;

const Button = ({ click, title }) => {
    return (
      <button
        onClick={click}
        className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left">
        {title}
      </button>
    );
  };