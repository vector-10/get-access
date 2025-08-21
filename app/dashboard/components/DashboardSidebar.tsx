'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaCalendarPlus, FaUsers } from "react-icons/fa";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: FaHome },
    { name: "Create Event", href: "/dashboard/create-events", icon: FaCalendarPlus },
    { name: "My Attendees", href: "/dashboard/attendees", icon: FaUsers },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-900/20 text-red-400 border-r-2 border-red-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
