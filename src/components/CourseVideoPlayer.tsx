
import React from 'react';

interface CourseVideoPlayerProps {
  videoUrl: string;
  title: string;
}

const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({ videoUrl, title }) => {
  // Extract video ID from YouTube URL
  const getYoutubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(videoUrl);
  
  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div className="aspect-video w-full bg-black rounded-md overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CourseVideoPlayer;
