import React from 'react';
import SearchBar from '../common/SearchBar';

interface VideoSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder: string;
}

const VideoSearchBar: React.FC<VideoSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
};

export default VideoSearchBar;