import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Stats from './Components/Stats'
import Features from './Components/Features'
import Slider from './Components/Slider'
import Compatibility from './Components/Compatibility'
import Dsection from './Components/DSection'
import Review from './Components/Review'
import { MoveRight } from "lucide-react"
import Footer from './Components/Footer'
import SmoothScrollProvider from './Components/SmoothScrollProvider'

const page = () => {
  return (
    <SmoothScrollProvider>
    <Navbar />
    <Hero/>
    <div className="my-20 text-white flex item-center justify-center">

    <a target='_blank' href="http://zumtv.net:2096/" className='rounded-md flex gap-4 font-poppins hover:bg-prime/90 p-5 bg-prime'>
    Reseller Portal Login <span><MoveRight /></span>
    </a>
    </div>
    <Dsection/>
    <Stats/>
    <Features/>
    <Slider/>
    <Compatibility/>
    <Review/>
    <Footer/>
      
    </SmoothScrollProvider>
  )
}

export default page
