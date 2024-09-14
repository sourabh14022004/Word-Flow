import React from 'react'
import sticker from '../../../assets/sticker.png'
import sticker1 from '../../../assets/xyz.png'

const Banner = () => {
  return (
    <>
      <div className='relative bg-white border-black border-b md:flex items-center justify-between h-[42.5rem]'>
        {/* Mobile Sticker */}
        <div className='md:hidden flex justify-center'>
          <img src={sticker} alt="sticker" className="w-1/2" />
        </div>

        {/* Text Section with Sticker1 Behind */}
        <div className='relative py-19 md:py-[10rem] flex flex-col items-start gap-10 px-6 md:px-[6rem] z-10'>
          
          <div className='relative text-left josefin-sans space-y-0 z-10'>
            {/* Sticker1 Image Positioned Behind */}
            <div className='absolute inset-0 z-0 flex justify-center items-center'>
                <img src={sticker1} alt="sticker background" className="w-[50rem] px-[10rem] object-cover scale-150" />
            </div>

            {/* Text Section */}
            <h1 className='relative z-10 text-[2.5rem] sm:text-[3rem] md:text-[5rem] font-normal leading-none'>
                Write to inspire,
            </h1>
            <h1 className='relative z-10 text-[2.5rem] sm:text-[3rem] md:text-[5rem] font-normal leading-none'>
                read to grow.
            </h1>
            </div>
          
          <p className='text-lg sm:text-xl md:text-2xl relative z-10'>
            A space to explore, express, and expand your knowledge.
          </p>

          <button
            className='capitalize p-8 py-3 rounded-full border-black border-b-2  
                            bg-green-400 text-black font-medium text-[20px] transition 
                            ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 
                            hover:bg-green-500 duration-300 shadow-none hover:shadow-lg hover:shadow-gray-400 relative z-10'>
            start reading
          </button>
        </div>

        {/* Desktop Sticker */}
        <div className='hidden md:flex justify-center p-10'>
          <img src={sticker} alt="sticker" className="w-full" />
        </div>
      </div>
    </>
  )
}

export default Banner;
