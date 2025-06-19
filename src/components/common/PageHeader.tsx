import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Button from './Button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  count?: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  actionButton,
  count 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 131, 95, 0.1)' }}>
            <Icon className="w-6 h-6" style={{ color: '#2a835f' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {title} {count !== undefined && `[${count}]`}
            </h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        </div>
        
        {actionButton && (
          <Button
            onClick={actionButton.onClick}
            icon={actionButton.icon}
            className="w-full lg:w-auto"
          >
            {actionButton.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;