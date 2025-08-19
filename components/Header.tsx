'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Menu, X, Phone, Plus } from 'lucide-react'

export default function Header() {
  const [location, setLocation] = useState('Lagos')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    detectUserLocation()
  }, [])

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

  const reverseGeocode = async (lat:any, lng:any) => {
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
    } catch (error) {
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
      <header className="bg-white border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-row items-center justify-between space-x-4">            

            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-orange-600">getAccess</span>
            </div>
            <div className="flex-1"></div>
            <div className="hidden md:flex flex-shrink-0 items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                Events
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                Contact
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                Partners
              </a>              

              <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
                Create Events
              </button>
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
          <span className="text-xl font-bold text-orange-600">Get Access</span>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          <div className="flex items-center space-x-3 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>
              {isLoadingLocation ? 'Detecting location...' : `Events in ${location}`}
            </span>
          </div>

          <div className="space-y-4">
            <a 
              href="#" 
              className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 py-3 transition-colors"
              onClick={closeMobileMenu}
            >
              <Phone className="h-5 w-5" />
              <span>Contact Support</span>
            </a>
          </div>

          <button 
            className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
            onClick={closeMobileMenu}
          >
            <Plus className="h-5 w-5" />
            <span>Create Events</span>
          </button>

          <div className="pt-4 border-t border-gray-200 space-y-3">
            <a href="#" className="block text-gray-600 hover:text-orange-600 py-2 transition-colors">
              How It Works
            </a>
            <a href="#" className="block text-gray-600 hover:text-orange-600 py-2 transition-colors">
              Pricing
            </a>
            <a href="#" className="block text-gray-600 hover:text-orange-600 py-2 transition-colors">
              Help Center
            </a>
            <a href="#" className="block text-gray-600 hover:text-orange-600 py-2 transition-colors">
              About Us
            </a>
          </div>

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