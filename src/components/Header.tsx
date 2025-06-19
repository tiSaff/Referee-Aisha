import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 w-full h-16 bg-[#2A8360] shadow-sm z-50 px-4">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-[#F0F6F6] rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center gap-2">
            <img 
              src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" 
              alt="MySAFF Logo" 
              className="lg:w-14 w-10 rounded-lg"
            />
            <span className="lg:text-xl font-bold text-white max-sm:hidden">
              Referee Platform
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6 text-white" />
          </button>
          
          <button className="flex items-center gap-2">
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;