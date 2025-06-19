import React, { useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  users: User[];
  selectedUsers: Array<{id: number, name: string}>;
  onUserSelect: (user: {id: number, name: string}) => void;
  onRemoveUser: (userId: number) => void;
  isUserSelected: (userId: number) => boolean;
  disabled?: boolean;
  placeholder?: string;
  allUsersSelected?: boolean;
  allUsersText?: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  isOpen,
  onToggle,
  onClose,
  searchTerm,
  onSearchChange,
  users,
  selectedUsers,
  onUserSelect,
  onRemoveUser,
  isUserSelected,
  disabled = false,
  placeholder = "Select users...",
  allUsersSelected = false,
  allUsersText = "All users selected"
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:border-transparent transition-all duration-200 cursor-pointer ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
        style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
        onClick={() => !disabled && onToggle()}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {selectedUsers.length === 0 ? (
              <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
                {allUsersSelected ? allUsersText : placeholder}
              </span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <span
                    key={user.id}
                    className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                  >
                    {user.name}-{user.id}
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveUser(user.id);
                        }}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
          {!disabled && (
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* User List */}
          <div className="max-h-40 overflow-y-auto">
            {users.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
            ) : (
              users.map((user) => {
                const isSelected = isUserSelected(user.id);
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUserSelect({ id: user.id, name: user.name });
                    }}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}-{user.id}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;