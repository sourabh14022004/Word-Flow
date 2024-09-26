import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { nav } from '../../data.js';
import Auth from './Auth/Auth.jsx';
import wordflow from '../../assets/word-flow-crop.png';
// import sticker from '../../assets/sticker.png'

const DemoHeader = () => {
    const [isActive, setIsActive] = useState(false);
    const [model, setModel]= useState(false);


    useEffect (() => {
        const scrollMe = () => {
            window.scrollY > 100 ? setIsActive(true) : setIsActive(false)
        };
        window.addEventListener("scroll", scrollMe);
    }, [])
    
  return (
    <header className={` border-b border-black sticky top-0 z-50 ${isActive ? "bg-green-200" : "bg-white"} transition-all duration-500 `}>
        <div className='size h-[70px] flex items-center justify-between'>
            <div className=' flex items-center justify-between'>
                <div>
                    <Link to={"/"} >
                        <img 
                            className=' h-[3rem] rounded-full'
                            src={wordflow}
                            alt='logo is fetching please wait...'
                        /> 
                    </Link>
                </div>
                <div className=' mx-2 capitalize font-Shadow-code cursor-pointer text-[30px] '>
                    <Link to={"/"}>
                        <p>word flow</p>
                    </Link>
                </div>
            </div>
            <div className= "flex items-center gap-5">
                <div className= " capitalize hidden text-sm md:flex items-center gap-5">
                    {nav.map((link, i) => (
                        <Link key={i} to={link.path}>{link.title}</Link>
                    ))}
                </div>
                <div className=' relative '>
                    <button 
                        onClick={() => setModel(true)}
                        className=" capitalize hidden text-base sm:flex items-center">
                        sign in
                    </button>
                    <Auth model = {model} setModel={setModel}/>
                </div>
                <button 
                    onClick={() => setModel(true)}
                    className={`capitalize ${isActive ? "bg-green-800" : "bg-black"} transition-all duration-800 text-white p-2 px-3 rounded-full font-medium `}>
                    get started
                </button>
            </div>
        </div>
    </header>
  )
}

export default DemoHeader;