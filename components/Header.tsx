'use client'

import { Search, MapPin } from 'lucide-react'


export default function Header() {
 return (
    <header className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex flex-row items-center justify-between space-x-8">
        
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-orange-600">Access</span>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="flex items-center bg-gray-50 rounded-lg border px-4 py-2">
            <input 
              type="text" 
              placeholder="Search events..."
              className="flex-1 bg-transparent outline-none"
            />
            <div className="flex items-center ml-4 space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Lagos</span>
              <button className="bg-orange-600 text-white p-1 rounded">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-orange-600">Contact</a>
          <button className="bg-orange-600 text-white px-4 py-2 rounded">
            Create Events
          </button>
        </div>

      </div>
    </div>
  </header>
 )
}



