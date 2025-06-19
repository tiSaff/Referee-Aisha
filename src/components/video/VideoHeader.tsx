import React from 'react';
import { Video as VideoIcon } from 'lucide-react';
import PageHeader from '../common/PageHeader';

interface VideoHeaderProps {
  title: string;
  subtitle?: string;
  totalVideos: number;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({
  title,
  subtitle,
  totalVideos
}) => {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      icon={VideoIcon}
      count={totalVideos}
    />
  );
};

export default VideoHeader;