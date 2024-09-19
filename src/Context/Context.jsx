import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase.js';
import Loading from '../Components/Loading/Loading.jsx';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';

const BlogContext = createContext();

const Context = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([])
    const [publish, setPublish] = useState(false);


    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        const getUsers = () => {
            const postRef = query(collection(db, "users"));
            onSnapshot(postRef, (snapshot) => {
                setAllUsers(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setUserLoading(false);
            });
        };
        getUsers();
    }, []);

    return ( 
            <BlogContext.Provider value={{currentUser, setCurrentUser, allUsers, userLoading, publish, setPublish}}> 
                {loading ? <Loading/> : children}
            </BlogContext.Provider>
        );
};
export default Context;

export const Blog = () => useContext(BlogContext);