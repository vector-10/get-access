'use client'

import { Search, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
 return (
   <header className="bg-white text-black shadow-sm">
     <div className="max-w-6xl mx-auto px-6 py-4">
       <div className="flex flex-row items-center gap-8">
         
         <Link href="/" className="text-3xl font-bold text-orange-500">
           Access
         </Link>

         <div className="flex-1 max-w-2xl">
           <div className="relative flex items-center bg-gray-100 rounded-full overflow-hidden">
             <input 
               type="text" 
               placeholder="Find your next event..."
               className="flex-1 px-6 py-3 bg-transparent text-gray-800 placeholder-gray-500 outline-none"
             />
             <div className="flex items-center gap-3 px-4 bg-white rounded-full m-1">
               <MapPin className="h-4 w-4 " />
               <span className="text-sm ">Lagos</span>
               <button className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors">
                 <Search className="h-4 w-4 " />
               </button>
             </div>
           </div>
         </div>

         {/* Navigation */}
         <nav className="flex items-center gap-6">
           <Link href="/help" className="text-gray-600 hover:text-gray-900 font-medium">
             Help
           </Link>
           <Link href="/dashboard" className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-colors">
             Create Event
           </Link>
         </nav>

       </div>
     </div>
   </header>
 )
}