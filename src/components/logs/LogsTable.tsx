import React from 'react';
import { Trash2, User, Clock, Globe } from 'lucide-react';
import { LogEntry } from '../../types';
import Button from '../common/Button';

interface LogsTableProps {
  logs: LogEntry[];
  onDelete: (id: number) => void;
  loading: boolean;
}

const LogsTable: React.FC<LogsTableProps> = ({ 
  logs, 
  onDelete,
  loading
}) => {
  const getActionBadge = (action: string) => {
    const styles = {
      Create: 'bg-green-100 text-green-800 border-green-200',
      Update: 'bg-blue-100 text-blue-800 border-blue-200',
      Delete: 'bg-red-100 text-red-800 border-red-200',
      Login: 'bg-purple-100 text-purple-800 border-purple-200',
      Logout: 'bg-gray-100 text-gray-800 border-gray-200',
      View: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-200';
    const style = styles[action as keyof typeof styles] || defaultStyle;

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${style}`}>
        {action}
      </span>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {log.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{log.user}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getActionBadge(log.action)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {log.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{log.ipAddress}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{formatTimestamp(log.timestamp)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDelete(log.id)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTable;