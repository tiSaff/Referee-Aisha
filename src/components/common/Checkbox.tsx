import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors ${className}`}>
      <div className="flex-1 pr-4">
        <label className="text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="rounded border-gray-300 focus:ring-2 transition-all duration-200 w-4 h-4"
        style={{ 
          '--tw-ring-color': '#2a835f',
          accentColor: '#2a835f'
        } as React.CSSProperties}
      />
    </div>
  );
};

export default Checkbox;