'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome,  FaUsers } from "react-icons/fa";


export default function DashboardSidebar() {
 const pathname = usePathname();

 const navItems = [
   { name: "Overview", href: "/dashboard", icon: FaHome },
   { name: "My Events", href: "/dashboard/my-events", icon: FaUsers },
   { name: "Attendees", href: "/dashboard/attendees", icon: FaUsers },
 ];

 return (
   <aside 
     className="w-64 border-r border-gray-200 h-full"
     style={{
       background: `
         linear-gradient(rgba(156, 163, 175, 0.05) 1px, transparent 1px),
         linear-gradient(90deg, rgba(156, 163, 175, 0.05) 1px, transparent 1px),
         #ffffff
       `,
       backgroundSize: "16px 16px, 16px 16px, 100%",
     }}
   >
     <div className="p-6">
       <nav className="space-y-2">
         {navItems.map((item) => {
           const isActive = pathname === item.href;
           const Icon = item.icon;

           return (
             <Link
               key={item.name}
               href={item.href}
               className={`flex items-center space-x-3 px-3 py-2 rounded-md text-md font-medium transition-colors ${
                 isActive
                   ? "bg-orange-600/10 text-orange-600 border-r-2 border-orange-600"
                   : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
               }`}
             >
               <Icon className="w-5 h-5" />
               <span>{item.name}</span>
             </Link>
           );
         })}
       </nav>
     </div>
   </aside>
 );
}