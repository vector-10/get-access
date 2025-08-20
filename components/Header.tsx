'use client'

import React, { useState, useEffect } from 'react'
import {  Menu, X, Ticket } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [location, setLocation] = useState('Lagos')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    detectUserLocation()
  })

  const detectUserLocation = async () => {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported')
      return
    }

    setIsLoadingLocation(true)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const locationName = await reverseGeocode(latitude, longitude)
          setLocation(locationName)
        } catch (error) {
          console.log('Error getting location name:', error)
          setLocation('Lagos') 
        } finally {
          setIsLoadingLocation(false)
        }
      },
      (error) => {
        console.log('Location access denied or failed:', error)
        setLocation('Lagos')
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 
      }
    )
  }

  const reverseGeocode = async (lat:number, lng:number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
      )
      const data = await response.json()
      const city = data.address?.city || 
                  data.address?.town || 
                  data.address?.village || 
                  data.address?.state ||
                  'Lagos'
      
      return city
    } catch  {
      throw new Error('Geocoding failed')
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
     <header className="bg-white border-b border-gray-200  z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-row items-center justify-between space-x-4">  
            <div className="flex-shrink-0 flex items-center">              
              <Link href="/" className="text-2xl font-bold text-orange-600">getAccess</Link>
              <Ticket className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1"></div>
            <div className="hidden md:flex flex-shrink-0 items-center space-x-4">
              <a href="#events" className="text-gray-700 hover:text-orange-600 transition-colors">
                Events
              </a>
              <a href="#process" className="text-gray-700 hover:text-orange-600 transition-colors">
                Process
              </a>
              <a href="#partners" className="text-gray-700 hover:text-orange-600 transition-colors">
                Partners
              </a>              

              <Link href="dashboard/create-events" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
                Create Events
              </Link>
            </div>

            <div className="md:hidden flex-shrink-0">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}  

      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <span className="text-xl font-bold text-orange-600">getAccess</span>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">   

          <div className="  space-y-6">
          <a href="#events" className="block text-gray-600 hover:text-orange-600 py-2 transition-colors">
              Events
            </a>
            <a href="#process" className="block text-gray-600 hover:text-orange-600 py-2 transition-colors">
            Process
            </a>           
            <a href="#partners" className="block text-gray-600 hover:text-orange-600 py-2 transition-colors">
              Partners
            </a>
          </div>

          <Link href="/dashboard/create-events" className="bg-orange-600 text-white px-8 py-2 rounded hover:bg-orange-700 transition-colors">
                Create Events
              </Link>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Secure ticketing powered by Civic Auth
            </p>
          </div>

        </div>
      </div>
    </>
  )
}