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

const SharePost = () => {
    const [showDrop, setShowDrop] = useState(false);
  return (
    <div className="relative">
        <button 
            onClick={() => setShowDrop(!showDrop)}
            className="text-2xl py-1">
            <FaRegShareFromSquare />
        </button>
        <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
            
            <Button click = "" title = "Copy link" icon ={<PiLinkBold />} />
            <Button click = "" title = "Share of Twitter" icon ={<FaXTwitter/>} />
            <Button click = "" title = "Share on WhatsApp" icon ={<FaWhatsapp />} />
            <Button click = "" title = "Share on Linkedin" icon ={<FaLinkedinIn />} />
            <Button click = "" title = "Share on Telegram" icon ={<FaTelegram />} />
            <Button click = "" title = "Share on FaceBook" icon ={<FaFacebook />} />
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