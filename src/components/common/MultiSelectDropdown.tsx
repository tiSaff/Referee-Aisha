import React from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  flag?: string;
}

interface MultiSelectDropdownProps {
  label: string;
  placeholder: string;
  options: Option[];
  selectedValues: string[];
  searchTerm: string;
  showDropdown: boolean;
  disabled?: boolean;
  multiSelect?: boolean;
  onToggleDropdown: () => void;
  onSearchChange: (term: string) => void;
  onOptionSelect: (value: string) => void;
  onRemoveValue: (value: string) => void;
  className?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  placeholder,
  options,
  selectedValues,
  searchTerm,
  showDropdown,
  disabled = false,
  multiSelect = false,
  onToggleDropdown,
  onSearchChange,
  onOptionSelect,
  onRemoveValue,
  className = ''
}) => {
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return placeholder;
    if (multiSelect) {
      return selectedValues.join(', ');
    }
    const selectedOption = options.find(opt => opt.value === selectedValues[0]);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const getSelectedOption = () => {
    return options.find(opt => opt.value === selectedValues[0]);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white cursor-pointer transition-all duration-200 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400'
        }`}
        style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
        onClick={() => !disabled && onToggleDropdown()}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {multiSelect && selectedValues.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((value) => {
                  const option = options.find(opt => opt.value === value);
                  return (
                    <span
                      key={value}
                      className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                    >
                      {option?.flag && <span className="mr-1">{option.flag}</span>}
                      {option?.label || value}
                      {!disabled && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveValue(value);
                          }}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {!multiSelect && selectedValues.length > 0 && getSelectedOption()?.flag && (
                  <span className="text-lg">{getSelectedOption()?.flag}</span>
                )}
                <span className={`${selectedValues.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
                  {getDisplayValue()}
                </span>
              </div>
            )}
          </div>
          {!disabled && (
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionSelect(option.value);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {option.flag && (
                        <span className="text-lg">{option.flag}</span>
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {option.label}
                      </span>
                    </div>
                    {multiSelect && isSelected && (
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

export default MultiSelectDropdown;