import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <>
      {/* Mobile Header */}
      <header className="text-white px-4 py-3 flex items-center justify-between lg:hidden shadow-md" style={{ backgroundColor: '#2a835f' }}>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <img 
              src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" 
              alt="MySAFF Logo" 
              className="w-8 h-8 rounded"
            />
            <span className="font-semibold text-base sm:text-lg">VAR Installation Types</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button className="p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10">
            <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
          <button className="p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10">
            <User className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between text-white px-6 py-4 shadow-md" style={{ backgroundColor: '#2a835f' }}>
        <div className="flex items-center space-x-4">
          <img 
            src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" 
            alt="MySAFF Logo" 
            className="w-10 h-10 rounded"
          />
          <span className="font-bold text-xl">VAR Installation Types</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
          
          <button className="p-2 rounded-full transition-colors duration-200 hover:bg-black hover:bg-opacity-10">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-full transition-colors duration-200 hover:bg-black hover:bg-opacity-10">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;