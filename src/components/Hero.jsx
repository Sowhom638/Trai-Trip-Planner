import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 gap-10'>
  <h1 className='font-extrabold mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center max-w-6xl'>
    <span className='text-orange-600'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
  </h1>
  <h1 className='text-gray-600 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</h1>
  <Link to={`/create-trip`} className="bg-black hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition duration-20">
            Get Started, it's free
          </Link>
          <div className="my-10 w-full mx-5 md:w-2/3 flex items-center justify-center overflow-hidden rounded-xl">
          <img className="w-full h-full object-center rounded-xl" src="https://img.freepik.com/premium-photo/orange-travel-suitcase_1398950-8.jpg?semt=ais_hybrid&w=740&q=80" alt="Hero section image" />
          </div>
</div>
  )
}

export default Hero
