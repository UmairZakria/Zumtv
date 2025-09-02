import React from 'react'
import SmoothScrollProvider from '../Components/SmoothScrollProvider'
import Features from '../Components/Features'
import Slider from '../Components/Slider'
import Compatibility from '../Components/Compatibility'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Review from '../Components/Review'

const Page = () => {
  return (
    <div>
    <SmoothScrollProvider>
        <Navbar />
        <Features />
        <Slider />
        <Compatibility />
        <Review />
        <Footer />
      
    </SmoothScrollProvider>
    </div>
  )
}

export default Page
