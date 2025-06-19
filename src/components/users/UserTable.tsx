import React from 'react';
import { Users as UsersIcon, Eye, Edit, Trash2 } from 'lucide-react';
import { User } from '../../types';

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  showEditDelete?: boolean;
  loading?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  onView, 
  onEdit, 
  onDelete, 
  showEditDelete = true,
  loading = false
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <UsersIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">
                        {user.email} • ID: {user.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : user.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                  <span className="truncate block">{user.location || 'Not specified'}</span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onView(user)}
                      disabled={loading}
                      className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </button>
                    
                    {showEditDelete && onEdit && (
                      <button 
                        onClick={() => onEdit(user)}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-1.5 bg-white text-gray-700 text-xs font-medium rounded-md border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                    )}
                    
                    {showEditDelete && onDelete && (
                      <button 
                        onClick={() => onDelete(user)}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-1.5 bg-white text-red-600 text-xs font-medium rounded-md border border-red-300 hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-3 h-3 mr-1 text-red-600" />
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;