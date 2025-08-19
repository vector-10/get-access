import React from 'react';
import { 
  Mail, 
  MapPin, 
  Twitter, 
  Github,
  Linkedin,
  Ticket,
  Shield,
  Globe
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Get Access</span>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              Secure Web3 event ticketing for Nigeria's blockchain community.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-sm">hello@getaccess.ng</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Browse Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Create Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Civic Verification</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Web3 Events</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Conferences</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Workshops</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Meetups</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Virtual Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Hackathons</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <span>© 2025 Get Access</span>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span>Civic Auth Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-orange-500" />
                <span>Blockchain Secured</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors group">
                <Twitter className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors group">
                <Github className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors group">
                <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;