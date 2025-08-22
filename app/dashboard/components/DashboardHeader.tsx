'use client';

import { FaTicketAlt, FaPlus, FaChevronDown } from "react-icons/fa";
import { useUser } from "@civic/auth-web3/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import CreateEventModal from "./CreateEventModal";

interface DashboardHeaderProps {
  onMobileMenuToggle: () => void;
}

export default function DashboardHeader({ onMobileMenuToggle }: DashboardHeaderProps) {
  const { user, signOut } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <header 
        className="border-b border-gray-200 relative z-10"
        style={{
          background: `
            linear-gradient(rgba(156, 163, 175, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(156, 163, 175, 0.05) 1px, transparent 1px),
            #ffffff
          `,
          backgroundSize: "16px 16px, 16px 16px, 100%",
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <FaTicketAlt className="w-6 h-6 text-orange-600" />
              <span className="text-lg lg:text-xl font-semibold text-gray-900">
                getAccess
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCreateEventModalOpen(true)}
                className="hidden lg:flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                <span>Create Event</span>
              </button>

              <div className="hidden lg:block relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
                >
                  <span>{user?.name || "User"}</span>
                  <FaChevronDown className="w-3 h-3" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onMobileMenuToggle}
                className="lg:hidden text-gray-700 hover:text-orange-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <CreateEventModal 
        isOpen={createEventModalOpen} 
        onClose={() => setCreateEventModalOpen(false)} 
      />
    </>
  );
}