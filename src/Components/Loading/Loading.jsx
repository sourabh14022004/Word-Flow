import React from 'react'
import gif1 from "/loading.gif"

const Loading = () => {
  return (
    <div className=' fixed inset-0 grid place-items-center bg-white z-index-30'>
        <img src={gif1} alt="loading..." className=' size-[8rem]'></img>
    </div>
  )
}

export default Loading;