import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Stats from './Components/Stats'
import Features from './Components/Features'
import Slider from './Components/Slider'
import Compatibility from './Components/Compatibility'
import Dsection from './Components/DSection'
import Review from './Components/Review'
import Footer from './Components/Footer'
import SmoothScrollProvider from './Components/SmoothScrollProvider'

const page = () => {
  return (
    <SmoothScrollProvider>
    <Navbar />
    <Hero/>
    <Stats/>
    <Dsection/>
    <Features/>
    <Slider/>
    <Compatibility/>
    <Review/>
    <Footer/>
      
    </SmoothScrollProvider>
  )
}

export default page
