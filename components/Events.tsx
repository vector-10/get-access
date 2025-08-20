'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Calendar, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  price: string
  image: string
  isVerified: boolean
  category: 'Conference' | 'Workshop' | 'Meetup' | 'Party'
  isHighlighted?: boolean
}

const events: Event[] = [
  {
    id: '1',
    title: 'OnChain Conference Lagos 2025',
    date: 'Sat, Aug 30th',
    time: '9:00 AM',
    location: 'Landmark Centre, Lagos',
    price: '₦15,000',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
    isVerified: true,
    category: 'Conference',
    isHighlighted: true
  },
  {
    id: '2',
    title: 'Web3 Lagos Developer Meetup',
    date: 'Fri, Aug 29th',
    time: '6:00 PM',
    location: 'Co-creation Hub, Yaba',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    isVerified: true,
    category: 'Meetup',
    isHighlighted: true
  },
  {
    id: '3',
    title: 'Blockchain Workshop Abuja',
    date: 'Sun, Aug 31st',
    time: '2:00 PM',
    location: 'Transcorp Hilton, Abuja',
    price: '₦8,500',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop',
    isVerified: true,
    category: 'Workshop'
  },
  {
    id: '4',
    title: 'Crypto Trading Masterclass',
    date: 'Tue, Sep 2nd',
    time: '7:00 PM',
    location: 'Virtual Event',
    price: '₦12,000',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    isVerified: false,
    category: 'Workshop'
  },
  {
    id: '5',
    title: 'DeFi Summer Party',
    date: 'Fri, Sep 5th',
    time: '8:00 PM',
    location: 'Tafawa Balewa Square, Lagos',
    price: '₦5,000',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
    isVerified: true,
    category: 'Party',
    isHighlighted: true
  },
  {
    id: '6',
    title: 'NFT Art Exhibition',
    date: 'Sat, Sep 6th',
    time: '4:00 PM',
    location: 'Nike Art Gallery, Lagos',
    price: '₦3,000',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    isVerified: true,
    category: 'Conference'
  }
]

const categories = ['All Events', 'Conference', 'Workshop', 'Meetup', 'Party']
const filters = ['Price', 'Date', 'Location']

export default function UpcomingEventsSection() {
  const [activeCategory, setActiveCategory] = useState('All Events')
  const [userLocation, setUserLocation] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

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
          const country = await reverseGeocode(latitude, longitude)
          setUserLocation(country)
        } catch (error) {
          console.log('Error getting location:', error)
          setUserLocation('') 
        } finally {
          setIsLoadingLocation(false)
        }
      },
      (error) => {
        console.log('Location access denied:', error)
        setUserLocation('') 
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
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3&addressdetails=1`
      )
      const data = await response.json()
      
      const country = data.address?.country || 'Nigeria'
      return country
    } catch  {
      throw new Error('Geocoding failed')
    }
  }
  

  const filteredEvents = activeCategory === 'All Events' 
    ? events 
    : events.filter(event => event.category === activeCategory)

  return (
    <section id="events" className="w-full px-4 md:px-8 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Find an event in:</h2>
              <div className="flex items-center space-x-2 text-orange-600">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">
                  {isLoadingLocation ? 'Detecting location...' : userLocation}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                {event.isHighlighted && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                    HIGHLIGHTED EVENT
                  </div>
                )}
                
                {event.isVerified && (
                  <div className="absolute top-4 right-4 bg-[#8174fc] text-white p-1.5 rounded-full z-10">
                    <Shield className="h-3 w-3" />
                  </div>
                )}

                  <Image
                    fill
                    src={event.image}
                    alt={event.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={90}
                  />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gray-600 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      event.price === 'Free' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {event.price}
                    </span>
                  </div>
                </div>

                {event.isVerified && (
                  <div className="mt-3 flex items-center space-x-1 text-[#8174fc] text-xs">
                    <Shield className="h-3 w-3" />
                    <span>Civic Verified Organizer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/events" className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
            View All Events
          </Link>
        </div>
        
      </div>
    </section>
  )
}