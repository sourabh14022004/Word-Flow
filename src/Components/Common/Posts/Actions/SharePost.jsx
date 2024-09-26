import React, { useState } from 'react'
import DropDown from '../../../../Utils/DropDown';
import { FaRegShareFromSquare } from "react-icons/fa6";
import { PiLinkBold } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import { toast } from 'react-toastify';

const SharePost = () => {
    const [showDrop, setShowDrop] = useState(false);
    const path = window.location.href;
    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(path);
        toast.success("Link has been copied")
        setShowDrop(false);
      } catch (error) {
        toast.error(error.message);
        setShowDrop(false);
      }
    }


  return (
    <div className="relative">
        <button 
            onClick={() => setShowDrop(!showDrop)}
            className="text-2xl py-1 hover:opacity-40 transition-opacity">
            <FaRegShareFromSquare />
        </button>
        <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
            {/* normal copy link */}
            <Button click = {copyLink} title = "Copy link" icon ={<PiLinkBold />} />

            {/* Twitter share button */}
            <TwitterShareButton url={path}>
              <Button  title = "Share of Twitter" icon ={<FaXTwitter/>} />
            </TwitterShareButton>

            {/* WhatsApp share button */}
            <WhatsappShareButton url={path}>
              <Button  title = "Share on WhatsApp" icon ={<FaWhatsapp />} />
            </WhatsappShareButton>

            {/* Linkedin share button */}
            <LinkedinShareButton url={path}>
              <Button  title = "Share on Linkedin" icon ={<FaLinkedinIn />} />
            </LinkedinShareButton>

            {/* Telegram share button */}
            <TelegramShareButton url={path}>
              <Button  title = "Share on Telegram" icon ={<FaTelegram />} />
            </TelegramShareButton>

            {/* Facebook share button */}
            <FacebookShareButton url={path}>
              <Button  title = "Share on FaceBook" icon ={<FaFacebook />} />
            </FacebookShareButton>
      
        </DropDown>
    </div>
  )
}

export default SharePost;
const Button = ({ click, icon, title }) => {
    return (
      <button
        onClick={click}
        className="p-2 hover:bg-gray-200 hover:text-black/80 w-full text-sm text-left
        flex items-center gap-2 cursor-pointer text-gray-600">
        <span className="text-[1.2rem]">{icon}</span>
        {title}
      </button>
    );
  };