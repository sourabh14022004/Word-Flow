import React from 'react'
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Blog } from '../../Context/Context';

const OurStory = () => {
    const {authModel, setAuthModel}= Blog();
  return (
    <>
    <div className=' bg-black text-white'>
        <section className='bg-black text-white' >
      <div className='flex flex-col lg:flex-col lg:items-start w-full h-auto'>
        {/* Left Section */}
        <div className='lg:w-1/2 w-full px-6 md:px-8 lg:px-12 flex flex-col gap-5'>
          {/* head */}
          <div className='flex flex-col text-white font-Playfair text-4xl md:text-6xl lg:text-7xl py-12 md:py-16 font-semibold'>
            <h1>Everyone has a</h1>
            <h1>story to tell</h1>
          </div>

          {/* content */}
          <div className='text-base md:text-lg lg:text-xl nc gap-7 flex flex-col'>
            <div>
                <span className='text-lg md:text-xl'>Word Flow,</span>
                <p>
                is a platform where voices and ideas come together. It allows anyone to share their experiences, 
                insights, and creativity without worrying about building an audience first. In a fast-paced and 
                cluttered online world, Word Flow offers a peaceful space for thoughtful content. Its design is 
                straightforward, inviting collaboration, and helping you reach the right readers for your message.
                </p>
            </div>
          </div>
          <blockquote className='cq qz ra rb rc rd'>
            <span className='ek qh'>
                "Our ultimate aim is to enrich our shared understanding of the world by harnessing the power of writing."
            </span>
          </blockquote>
          <p className='nc b qw qx qy fc'>"We believe that the content you engage with—whether reading or writing—holds 
            great significance. Words have the power to unite or separate, motivate or dishearten. In a time when 
            attention often goes to the most sensational and shallow narratives, we are creating a platform that 
            values depth, complexity, and meaningful engagement. A place where thoughtful discussions thrive over 
            fleeting opinions, and where substance is prioritized over appearance."</p>

        <p className='nc b qw qx qy fc'>Instead of selling ads or selling your data, we’re supported by a growing community of over a million
            <a className=' underline ml-1 mr-1' href="">Word flow members</a>
            who believe in our mission. If you’re new here,
            <span onClick={() => setAuthModel(true)} className=' underline ml-1 mr-1'>start reading</span>
            . Dive deeper into whatever matters to you. Find a post that helps you learn something new, or reconsider something familiar—and then
            <a href="">write your story</a>
            .
        </p>
        </div>

        {/* Right Section (Empty or for future content) */}
        <div className='lg:w-1/2 hidden lg:block'>
          {/* You can add background images, illustrations, or keep it empty for now */}
          
        </div>
      </div>
    </section>
    <span className=' flex flex-col py-10'>
        <span>
        <div className='flex flex-col border-t pl-4 pr-4 transition duration-300 hover:bg-white hover:text-black' href="" >
            <div onClick={() => setAuthModel(true)} className=' text-5xl font-Baskerville-regular py-6 px-9 flex items-center justify-between'>
                <span>
                Start reading
                </span>
                <span>
                →
                </span>
            </div>
        </div>
        </span>
        <span>
        <div className='flex flex-col border-t pl-4 pr-4 transition duration-300 hover:bg-white hover:text-black' href="">
            <div className=' text-5xl font-Baskerville-regular py-6 px-9 flex items-center justify-between'>
                    <span>
                        Start writhing
                    </span>
                    <span>
                        →
                    </span>
                </div>
            </div>
        </span>
        <span>
            <div className='flex flex-col border-t border-b pl-4 pr-4 transition duration-300 hover:bg-white hover:text-black' href="">
            <div className=' text-5xl font-Baskerville-regular py-6 px-9 flex items-center justify-between'>
                    <span>
                        Become a memeber
                    </span>
                    <span>
                        →
                    </span>
                </div>
            </div>
        </span>
    </span>
        {/* footer */}
        <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Main Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Word Flow</h1>
          <p className="text-md md:text-lg text-gray-400">
            A space where words come together to inspire, share, and connect.
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-[12px]">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            About
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            Blog
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            Contact
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white hover:scale-125 transition duration-300">
            <i className="insta text-2xl"><FaSquareInstagram /></i> {/* Replace with proper icon or SVG */}
          </a>
          <a href="#" className="text-gray-400 hover:text-white hover:scale-125 transition duration-300">
            <i className="fab fa-twitter text-2xl"> <FaSquareXTwitter /></i> {/* Replace with proper icon or SVG */}
          </a>
          <a href="https://github.com/sourabh14022004/Word-Flow" className="text-gray-400 hover:text-white hover:scale-125 transition duration-300">
            <i className="git-hub text-2xl"><FaGithub /></i> {/* Replace with proper icon or SVG */}
          </a>
          <a href="https://www.linkedin.com/in/sourabh-sarkar-a32821293/" className="text-gray-400 hover:text-white hover:scale-125 transition duration-300">
            <i className="fab fa-linkedin text-2xl"><FaLinkedin />
            </i> {/* Replace with proper icon or SVG */}
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Word Flow. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
    </>
    
  )
}

export default OurStory
