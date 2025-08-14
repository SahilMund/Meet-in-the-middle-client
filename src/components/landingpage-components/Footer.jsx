import React from 'react'
import locationimage from '../../assets/locationimage.png'
// src\assets\locationimage.png
const Footer = () => {
  return (
    
    <div className="flex flex-wrap items-center justify-between bg-[#FF4C61] px-6 md:px-40 py-6 gap-6">
  {/* Left section */}
  <div className="flex items-center gap-3">
    <img src={locationimage} height={40} width={40} alt="logo" />
    <h1 className="text-xl md:text-3xl font-semibold">Meet in Middle</h1>
  </div>

  {/* Right section */}
  <h2 className="text-sm md:text-base">
    © {new Date().getFullYear()} Meet in Middle. All rights reserved.
  </h2>
</div>

  )
}

export default Footer